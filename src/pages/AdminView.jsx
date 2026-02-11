import "../styles/admin.css";

function AdminView({ data, setData, closeAdmin }) {
  const updateSetting = (key, value) => {
    setData({
      ...data,
      settings: {
        ...data.settings,
        [key]: value,
      },
    });
  };

 const saveChanges = async () => {
  const token = localStorage.getItem("token");

  await fetch(`${import.meta.env.VITE_API_URL}/api/page`, {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  alert("Saved");
};



  return (
    <div className="admin-page">
      <button className="admin-back-btn" onClick={closeAdmin}>
        ← Back
      </button>

      <div className="admin-container">
        <h2 className="admin-title">Admin Panel</h2>

        {/* ================= PROFILE ================= */}
        <div className="card">
          <h3 className="card-heading">Profile</h3>

          <label>Name</label>
          <input
            value={data.settings.name}
            onChange={(e) => updateSetting("name", e.target.value)}
          />

          <label>Tagline</label>
          <input
            value={data.settings.tagline}
            onChange={(e) => updateSetting("tagline", e.target.value)}
          />

          <label>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () =>
                updateSetting("profileImage", reader.result);
              reader.readAsDataURL(file);
            }}
          />
        </div>

        {/* ================= BACKGROUND ================= */}
        <div className="card">
          <h3 className="card-heading">Background</h3>

          <label>Background Type</label>
          <select
            value={data.settings.backgroundType}
            onChange={(e) =>
              updateSetting("backgroundType", e.target.value)
            }
          >
            <option value="color">Solid Color</option>
            <option value="gradient">Gradient</option>
            <option value="image">Image</option>
          </select>

          {data.settings.backgroundType === "color" && (
            <>
              <label>Pick Color</label>
              <input
                type="color"
                value={data.settings.backgroundValue}
                onChange={(e) =>
                  updateSetting("backgroundValue", e.target.value)
                }
              />
            </>
          )}

          {data.settings.backgroundType === "gradient" && (
            <>
              <label>Choose Gradient</label>
              <select
                value={data.settings.backgroundValue}
                onChange={(e) =>
                  updateSetting("backgroundValue", e.target.value)
                }
              >
                <option value="linear-gradient(to bottom, #111, #333)">
                  Dark
                </option>
                <option value="linear-gradient(to bottom, #1e3c72, #2a5298)">
                  Blue
                </option>
                <option value="linear-gradient(to bottom, #ff416c, #ff4b2b)">
                  Red
                </option>
              </select>
            </>
          )}

          {data.settings.backgroundType === "image" && (
            <>
              <label>Upload Background Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () =>
                    updateSetting("backgroundValue", reader.result);
                  reader.readAsDataURL(file);
                }}
              />
            </>
          )}
        </div>

        {/* ================= SECTIONS ================= */}
        <div className="card">
          <h3 className="card-heading">Sections</h3>

          {data.sections.map((section, sIndex) => (
            <div key={section.id} className="section-card">
              {/* SECTION TITLE + DELETE */}
              <div className="link-row">
                <input
                  value={section.title}
                  onChange={(e) => {
                    const updated = [...data.sections];
                    updated[sIndex].title = e.target.value;
                    setData({ ...data, sections: updated });
                  }}
                />
                <div />
                <button
                  className="icon-delete"
                  title="Delete section"
                  onClick={() => {
                    if (!window.confirm("Delete this section?")) return;
                    const updated = data.sections.filter(
                      (_, i) => i !== sIndex
                    );
                    setData({ ...data, sections: updated });
                  }}
                >
                  🗑️
                </button>
              </div>

              {/* CATEGORIES */}
              {section.categories.map((cat, cIndex) => (
                <div key={cIndex} className="category-card">
                  {/* CATEGORY TITLE + DELETE */}
                  <div className="link-row">
                    <input
                      value={cat.title}
                      onChange={(e) => {
                        const updated = [...data.sections];
                        updated[sIndex].categories[cIndex].title =
                          e.target.value;
                        setData({ ...data, sections: updated });
                      }}
                    />
                    <div />
                    <button
                      className="icon-delete"
                      title="Delete category"
                      onClick={() => {
                        if (!window.confirm("Delete this category?")) return;
                        const updated = [...data.sections];
                        updated[sIndex].categories =
                          updated[sIndex].categories.filter(
                            (_, i) => i !== cIndex
                          );
                        setData({ ...data, sections: updated });
                      }}
                    >
                      🗑️
                    </button>
                  </div>

                  {/* LINKS */}
                  {cat.links.map((link, lIndex) => (
                    <div key={lIndex} className="link-row">
                      <input
                        value={link.label}
                        onChange={(e) => {
                          const updated = [...data.sections];
                          updated[sIndex]
                            .categories[cIndex]
                            .links[lIndex].label = e.target.value;
                          setData({ ...data, sections: updated });
                        }}
                      />

                      <input
                        value={link.url}
                        onChange={(e) => {
                          const updated = [...data.sections];
                          updated[sIndex]
                            .categories[cIndex]
                            .links[lIndex].url = e.target.value;
                          setData({ ...data, sections: updated });
                        }}
                      />

                      <button
                        className="icon-delete"
                        title="Delete link"
                        onClick={() => {
                          if (!window.confirm("Delete this link?")) return;
                          const updated = [...data.sections];
                          updated[sIndex].categories[cIndex].links =
                            updated[sIndex].categories[
                              cIndex
                            ].links.filter((_, i) => i !== lIndex);
                          setData({ ...data, sections: updated });
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}

                  {/* ADD LINK */}
                  <button
                    className="btn-small"
                    onClick={() => {
                      const updated = [...data.sections];
                      updated[sIndex].categories[cIndex].links.push({
                        label: "New Link",
                        url: "#",
                      });
                      setData({ ...data, sections: updated });
                    }}
                  >
                    + Add Link
                  </button>
                </div>
              ))}

              {/* ADD CATEGORY */}
              <button
                className="btn-small"
                onClick={() => {
                  const updated = [...data.sections];
                  updated[sIndex].categories.push({
                    title: "New Category",
                    links: [],
                  });
                  setData({ ...data, sections: updated });
                }}
              >
                + Add Category
              </button>
            </div>
          ))}

          {/* ADD SECTION */}
          <button
            className="btn-section"
            onClick={() =>
              setData({
                ...data,
                sections: [
                  ...data.sections,
                  {
                    id: Date.now(),
                    title: "NEW SECTION",
                    categories: [],
                  },
                ],
              })
            }
          >
            + Add Section
          </button>
        </div>

        {/* SAVE */}
        <button className="btn-save" onClick={saveChanges}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}

export default AdminView;
