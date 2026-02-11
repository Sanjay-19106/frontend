import { useState } from "react";
import "../styles/user.css";

function UserView({ data, isAdmin, openAdmin }) {
  const [open, setOpen] = useState(null);

  return (
    <div
      className="user-page"
      style={{
        background:
          data.settings.backgroundType === "image"
            ? `url(${data.settings.backgroundValue}) center/cover`
            : data.settings.backgroundValue,
      }}
    >
      {/* ⚙️ ONLY FOR ADMIN */}
      {isAdmin && (
        <button className="user-settings-btn" onClick={openAdmin}>
          ⚙️
        </button>
      )}

      <div className="user-container">
        {/* PROFILE */}
        <div className="profile">
          <div className="avatar">
            {data.settings.profileImage && (
              <img src={data.settings.profileImage} alt="profile" />
            )}
          </div>
          <h1>{data.settings.name}</h1>
          <p>{data.settings.tagline}</p>
        </div>

        {/* SECTIONS */}
        {data.sections.map((section) => (
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
              {section.categories.map((cat, i) => (
                <div key={i}>
                  <h4>{cat.title}</h4>
                  {cat.links.map((link, j) => (
                    <a key={j} href={link.url}>
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
