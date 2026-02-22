import "../styles/admin.css";

function AdminView({ data, setData, closeAdmin }) {
  // ✅ SAFE STRUCTURE (prevents crashes)
  const safeData = {
    settings: {
      name: "",
      tagline: "",
      backgroundType: "color",
      backgroundValue: "#111111",
      profileImage: "",
      ...(data?.settings || {}),
    },
    sections: data?.sections || [],
  };

  const updateSetting = (key, value) => {
    setData({
      ...safeData,
      settings: {
        ...safeData.settings,
        [key]: value,
      },
    });
  };

  const updateSections = (sections) => {
    setData({
      ...safeData,
      sections,
    });
  };

  const saveChanges = async () => {
    const token = sessionStorage.getItem("token");

    await fetch(`${import.meta.env.VITE_API_URL}/api/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(safeData),
    });

    alert("Saved Successfully ✅");
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
            value={safeData.settings.name}
            onChange={(e) => updateSetting("name", e.target.value)}
          />

          <label>Tagline</label>
          <input
            value={safeData.settings.tagline}
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
            value={safeData.settings.backgroundType}
            onChange={(e) =>
              updateSetting("backgroundType", e.target.value)
            }
          >
            <option value="color">Solid Color</option>
            <option value="gradient">Gradient</option>
            <option value="image">Image</option>
          </select>

          {safeData.settings.backgroundType === "color" && (
            <>
              <label>Pick Color</label>
              <input
                type="color"
                value={safeData.settings.backgroundValue}
                onChange={(e) =>
                  updateSetting("backgroundValue", e.target.value)
                }
              />
            </>
          )}

          {safeData.settings.backgroundType === "gradient" && (
            <>
              <label>Choose Gradient</label>
              <select
                value={safeData.settings.backgroundValue}
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

          {safeData.settings.backgroundType === "image" && (
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

          {safeData.sections.map((section, sIndex) => (
            <div key={section.id} className="section-card">
              <div className="link-row">
                <input
                  value={section.title}
                  onChange={(e) => {
                    const updated = [...safeData.sections];
                    updated[sIndex].title = e.target.value;
                    updateSections(updated);
                  }}
                />
                <div />
                <button
                  className="icon-delete"
                  onClick={() => {
                    const updated = safeData.sections.filter(
                      (_, i) => i !== sIndex
                    );
                    updateSections(updated);
                  }}
                >
                  🗑️
                </button>
              </div>

              {section.categories?.map((cat, cIndex) => (
                <div key={cIndex} className="category-card">
                  <div className="link-row">
                    <input
                      value={cat.title}
                      onChange={(e) => {
                        const updated = [...safeData.sections];
                        updated[sIndex].categories[cIndex].title =
                          e.target.value;
                        updateSections(updated);
                      }}
                    />
                    <div />
                    <button
                      className="icon-delete"
                      onClick={() => {
                        const updated = [...safeData.sections];
                        updated[sIndex].categories =
                          updated[sIndex].categories.filter(
                            (_, i) => i !== cIndex
                          );
                        updateSections(updated);
                      }}
                    >
                      🗑️
                    </button>
                  </div>

                  {cat.links?.map((link, lIndex) => (
                    <div key={lIndex} className="link-row">
                      <input
                        value={link.label}
                        onChange={(e) => {
                          const updated = [...safeData.sections];
                          updated[sIndex]
                            .categories[cIndex]
                            .links[lIndex].label = e.target.value;
                          updateSections(updated);
                        }}
                      />

                      <input
                        value={link.url}
                        onChange={(e) => {
                          const updated = [...safeData.sections];
                          updated[sIndex]
                            .categories[cIndex]
                            .links[lIndex].url = e.target.value;
                          updateSections(updated);
                        }}
                      />

                      <button
                        className="icon-delete"
                        onClick={() => {
                          const updated = [...safeData.sections];
                          updated[sIndex].categories[cIndex].links =
                            updated[sIndex].categories[
                              cIndex
                            ].links.filter((_, i) => i !== lIndex);
                          updateSections(updated);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}

                  <button
                    className="btn-small"
                    onClick={() => {
                      const updated = [...safeData.sections];
                      updated[sIndex].categories[cIndex].links.push({
                        label: "New Link",
                        url: "#",
                      });
                      updateSections(updated);
                    }}
                  >
                    + Add Link
                  </button>
                </div>
              ))}

              <button
                className="btn-small"
                onClick={() => {
                  const updated = [...safeData.sections];
                  updated[sIndex].categories.push({
                    title: "New Category",
                    links: [],
                  });
                  updateSections(updated);
                }}
              >
                + Add Category
              </button>
            </div>
          ))}

          <button
            className="btn-section"
            onClick={() =>
              updateSections([
                ...safeData.sections,
                {
                  id: Date.now(),
                  title: "NEW SECTION",
                  categories: [],
                },
              ])
            }
          >
            + Add Section
          </button>
        </div>

        <button className="btn-save" onClick={saveChanges}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}

export default AdminView;