import { useState } from "react";
import "../styles/user.css";

function UserView({ data, isAdmin, openAdmin }) {
  const [open, setOpen] = useState(null);

  // ✅ Safe defaults
  const settings = data?.settings || {};
  const sections = data?.sections || [];

  const backgroundStyle =
    settings.backgroundType === "image"
      ? {
          backgroundImage: `url(${settings.backgroundValue})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {
          background:
            settings.backgroundValue || "#111111",
        };

  return (
    <div className="user-page" style={backgroundStyle}>
     

      <div className="user-container">
        {/* PROFILE */}
        <div className="profile">
          <div className="avatar">
            {settings.profileImage && (
              <img src={settings.profileImage} alt="profile" />
            )}
          </div>
          <h1>{settings.name || "Your Name"}</h1>
          <p>{settings.tagline || "Your tagline here"}</p>
        </div>

        {/* SECTIONS */}
        {sections.map((section) => (
          <div key={section.id} className="accordion-item">
            <button
              className="accordion-btn"
              onClick={() =>
                setOpen(open === section.id ? null : section.id)
              }
            >
              {section.title}
            </button>

            <div
              className={`accordion-content ${
                open === section.id ? "open" : ""
              }`}
            >
              {section.categories?.map((cat, i) => (
                <div key={i}>
                  <h4>{cat.title}</h4>
                  {cat.links?.map((link, j) => (
                    <a key={j} href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserView;