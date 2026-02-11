import { useState } from "react";

function SectionAccordion({ sections }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="accordion">
      {sections.map((section) => (
        <div key={section.id} className="accordion-item">
          <button
            className="accordion-btn"
            onClick={() =>
              setOpenId(openId === section.id ? null : section.id)
            }
          >
            {section.title}
          </button>

          {openId === section.id && (
            <div className="accordion-content">
              {section.categories.map((cat) => (
                <div key={cat.title}>
                  <h4>{cat.title}</h4>
                  {cat.links.map((link) => (
                    <a key={link.label} href={link.url}>
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SectionAccordion;
