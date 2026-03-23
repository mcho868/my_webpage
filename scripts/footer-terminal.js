const TERMINAL_SECTIONS = [
    { name: 'about', selector: '#about', title: 'About Me' },
    { name: 'projects', selector: '#projects', title: 'My Projects' },
    { name: 'skills', selector: '#skills', title: 'My Skills' },
    { name: 'experience', selector: '#experience', title: 'My Roadmap' },
    { name: 'interests', selector: '#personal_interests', title: 'Personal Interests' },
    { name: 'contact', selector: '#contact', title: 'Contact' },
];

let footerTerminalInitialized = false;

document.addEventListener('components:loaded', initializeFooterTerminal);

if (document.readyState === 'complete') {
    initializeFooterTerminal();
}

function initializeFooterTerminal() {
    if (footerTerminalInitialized) return;

    const terminal = document.getElementById('footer-terminal');
    const header = document.getElementById('footer-terminal-header');
    const toggle = document.getElementById('footer-terminal-toggle');
    const output = document.getElementById('footer-terminal-output');
    const form = document.getElementById('footer-terminal-form');
    const input = document.getElementById('footer-terminal-input');
    const pathEl = document.getElementById('footer-terminal-path');

    if (!terminal || !header || !toggle || !output || !form || !input || !pathEl) return;

    footerTerminalInitialized = true;

    const state = {
        currentPath: '/',
        isOpen: false,
        height: 340,
        dragStartY: 0,
        dragStartHeight: 340,
        dragging: false,
        commandHistory: [],
        historyIndex: -1,
    };

    const sectionMap = new Map(TERMINAL_SECTIONS.map(section => [section.name, section]));

    function clampHeight(height) {
        return Math.max(220, Math.min(Math.round(height), Math.floor(window.innerHeight * 0.85)));
    }

    function setTerminalHeight(height) {
        state.height = clampHeight(height);
        terminal.style.setProperty('--footer-terminal-height', `${state.height}px`);
    }

    function updatePrompt() {
        const path = state.currentPath === '/' ? '/' : state.currentPath;
        pathEl.textContent = `visitor@portfolio:${path} $`;
    }

    function setOpen(open, focusInput = true) {
        state.isOpen = open;
        terminal.classList.toggle('is-open', open);
        toggle.textContent = open ? 'CLOSE' : 'OPEN';
        toggle.setAttribute('aria-expanded', String(open));
        if (open && focusInput) input.focus();
    }

    function escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function scrollOutputToBottom() {
        output.scrollTop = output.scrollHeight;
    }

    function appendLine(text, type = 'output') {
        const line = document.createElement('div');
        line.className = `footer-terminal-line footer-terminal-line-${type}`;
        line.innerHTML = text;
        output.appendChild(line);
        scrollOutputToBottom();
    }

    function appendCommand(command) {
        appendLine(
            `<span class="footer-terminal-command-prefix">${escapeHtml(pathEl.textContent)}</span> ${escapeHtml(command)}`,
            'command'
        );
    }

    function normalizeWhitespace(value) {
        return value.replace(/\s+/g, ' ').trim();
    }

    function collectSectionContent(section) {
        const element = document.querySelector(section.selector);
        if (!element) {
            return `${section.title}\nSection unavailable.`;
        }

        const lines = [];
        const title = element.querySelector('.section-title, h1, h2');
        const subtitle = element.querySelector('.section-subtitle');

        if (title) lines.push(normalizeWhitespace(title.textContent));
        if (subtitle) lines.push(normalizeWhitespace(subtitle.textContent));

        element.querySelectorAll('h3, h4, p').forEach(node => {
            const text = normalizeWhitespace(node.textContent || '');
            if (!text || lines.includes(text)) return;
            lines.push(text);
        });

        const badges = Array.from(element.querySelectorAll('.tech-badge'))
            .map(node => normalizeWhitespace(node.textContent || ''))
            .filter(Boolean)
            .slice(0, 12);

        if (badges.length) {
            lines.push(`Tech: ${badges.join(', ')}`);
        }

        const links = Array.from(element.querySelectorAll('a[href]'))
            .map(node => normalizeWhitespace(node.textContent || ''))
            .filter(Boolean)
            .slice(0, 6);

        if (links.length) {
            lines.push(`Links: ${links.join(', ')}`);
        }

        return lines.join('\n').slice(0, 2200);
    }

    function renderMultiline(text) {
        return `<pre>${escapeHtml(text)}</pre>`;
    }

    function listRootEntries() {
        const entries = ['README.txt', ...TERMINAL_SECTIONS.map(section => `${section.name}/`)];
        appendLine(renderMultiline(entries.join('\n')));
    }

    function listSectionEntries() {
        appendLine(renderMultiline(['content.txt'].join('\n')));
    }

    function getCurrentSection() {
        if (state.currentPath === '/') return null;
        return sectionMap.get(state.currentPath.slice(1)) || null;
    }

    function scrollToSection(section) {
        const element = document.querySelector(section.selector);
        if (!element) return;

        const nav = document.querySelector('.navbar');
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = element.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({
            top: Math.max(top, 0),
            behavior: 'smooth',
        });
    }

    function printHelp() {
        appendLine(renderMultiline(
            [
                'Available commands:',
                'help            show this command list',
                'ls              list entries in the current directory',
                'pwd             print current path',
                'cd <section>    move into a section',
                'cd /            return to root',
                'cd ..           return to root',
                'cat             print current section content',
                'cat content.txt print current section content',
                'cat README.txt  print terminal usage from root',
                'clear           clear the terminal output',
            ].join('\n')
        ));
    }

    function printReadme() {
        appendLine(renderMultiline(
            [
                'Portfolio terminal navigation',
                '',
                'Use `ls` to see sections, `cd <section>` to jump to one, and `cat` to read the content snapshot.',
                'Examples:',
                '  ls',
                '  cd projects',
                '  cat',
                '  cd /',
            ].join('\n')
        ));
    }

    function runCommand(rawCommand) {
        const command = rawCommand.trim();
        if (!command) return;

        appendCommand(command);
        state.commandHistory.push(command);
        state.historyIndex = state.commandHistory.length;

        const [name, ...args] = command.split(/\s+/);
        const currentSection = getCurrentSection();

        switch (name) {
        case 'help':
            printHelp();
            break;
        case 'pwd':
            appendLine(renderMultiline(state.currentPath));
            break;
        case 'ls':
            if (currentSection) {
                listSectionEntries();
            } else {
                listRootEntries();
            }
            break;
        case 'cd': {
            const target = args[0];

            if (!target || target === '/' || target === '~' || target === '..') {
                state.currentPath = '/';
                updatePrompt();
                appendLine(renderMultiline('/'));
                break;
            }

            const normalizedTarget = target.replace(/^\/+|\/+$/g, '');
            const nextSection = target === '/'
                ? null
                : sectionMap.get(normalizedTarget);
            if (!nextSection) {
                appendLine(renderMultiline(`cd: no such directory: ${target}`), 'error');
                break;
            }

            state.currentPath = `/${nextSection.name}`;
            updatePrompt();
            appendLine(renderMultiline(state.currentPath));
            scrollToSection(nextSection);
            break;
        }
        case 'cat':
            if (!currentSection) {
                if (args[0] === 'README.txt') {
                    printReadme();
                } else {
                    appendLine(renderMultiline('cat: enter a section first or use `cat README.txt` from root.'), 'error');
                }
                break;
            }

            if (!args[0] || args[0] === 'content.txt' || args[0] === '.') {
                appendLine(renderMultiline(collectSectionContent(currentSection)));
            } else {
                appendLine(renderMultiline(`cat: no such file: ${args[0]}`), 'error');
            }
            break;
        case 'clear':
            output.innerHTML = '';
            break;
        default:
            appendLine(renderMultiline(`${name}: command not found`), 'error');
            break;
        }
    }

    function handleHistoryNavigation(direction) {
        if (!state.commandHistory.length) return;
        state.historyIndex = Math.max(0, Math.min(state.commandHistory.length, state.historyIndex + direction));
        const nextValue = state.historyIndex === state.commandHistory.length
            ? ''
            : state.commandHistory[state.historyIndex];
        input.value = nextValue;
    }

    function startDrag(event) {
        state.dragging = true;
        state.dragStartY = event.clientY;
        state.dragStartHeight = state.isOpen ? state.height : 320;
        setOpen(true, false);
        setTerminalHeight(state.dragStartHeight);
        terminal.classList.add('is-dragging');
        header.setPointerCapture(event.pointerId);
    }

    function onDrag(event) {
        if (!state.dragging) return;
        const delta = state.dragStartY - event.clientY;
        setTerminalHeight(state.dragStartHeight + delta);
    }

    function endDrag(event) {
        if (!state.dragging) return;
        state.dragging = false;
        terminal.classList.remove('is-dragging');
        if (header.hasPointerCapture(event.pointerId)) {
            header.releasePointerCapture(event.pointerId);
        }
    }

    header.addEventListener('pointerdown', event => {
        if (event.target === toggle) return;
        startDrag(event);
    });
    header.addEventListener('pointermove', onDrag);
    header.addEventListener('pointerup', endDrag);
    header.addEventListener('pointercancel', endDrag);

    toggle.addEventListener('click', () => {
        setOpen(!state.isOpen);
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        const command = input.value;
        input.value = '';
        runCommand(command);
    });

    input.addEventListener('keydown', event => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            handleHistoryNavigation(-1);
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            handleHistoryNavigation(1);
        }
    });

    document.addEventListener('keydown', event => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'j') {
            event.preventDefault();
            setOpen(!state.isOpen);
        }
    });

    window.addEventListener('resize', () => {
        setTerminalHeight(state.height);
    });

    setTerminalHeight(state.height);
    updatePrompt();
    printReadme();
    appendLine(renderMultiline('Shortcut: Cmd/Ctrl + J toggles the terminal. Drag the header to resize it.'));
}
