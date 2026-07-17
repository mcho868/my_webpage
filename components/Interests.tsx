type Interest = {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
};

const INTERESTS: Interest[] = [
  {
    icon: "fas fa-dumbbell",
    title: "FITNESS",
    subtitle: "NASM Certified Personal Trainer",
    description:
      "As a certified personal trainer, I'm passionate about strength training and functional fitness. I enjoy helping others develop sustainable workout routines while pursuing my own fitness goals through a combination of weight training, calisthenics, and mobility work.",
  },
  {
    icon: "fas fa-guitar",
    title: "MUSIC",
    subtitle: "Guitarist in multiple bands",
    description:
      "I was always interested in music since I was little and guitar specifically got me interested due to how cool it is. Playing guitar on the side was a good life balance for me, resting exhausted brain from study.",
  },
  {
    icon: "fas fa-coffee",
    title: "COFFEE",
    subtitle: "Home Barista",
    description:
      "Coffee is more than a morning ritual for me—it's a craft I've been exploring for years. I cannot live without them :)",
  },
  {
    icon: "fas fa-gamepad",
    title: "I've quit GAMING",
    subtitle: "FromSoftware Fan",
    description:
      "I'm an avid gamer with a particular fondness for FromSoftware titles like Dark Souls, Bloodborne, and Elden Ring. I appreciate games with challenging gameplay, immersive worlds, and innovative design. I've quit gaming recently to lock in :)",
  },
];

export default function Interests() {
  return (
    <section id="personal_interests" className="section alternating-section">
      <div className="container">
        <h2 className="section-title">Personal Interests</h2>
        <p className="section-subtitle">My hobbies and passions</p>

        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="interests-container">
            {INTERESTS.map((interest) => (
              <div key={interest.title} className="interest-card">
                <div className="interest-icon">
                  <i className={interest.icon}></i>
                </div>
                <h3 className="interest-title">{interest.title}</h3>
                <div className="interest-overlay">
                  <h4>{interest.subtitle}</h4>
                  <p>{interest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
