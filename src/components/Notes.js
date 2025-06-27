import React, { useState } from "react";
import styles from "./Notes.module.css";
import Image from "../assets/image-removebg-preview 1.png";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Notes = ({
  selectedGroup,
  addNote,
  setSelectedGroup,
  isMobile,
  setIsMobile,
}) => {
  const [note, setNote] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const now = new Date();
    const newNote = {
      note: note,
      date: now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: now.toLocaleTimeString(),
    };
    if (newNote.note.trim() === "") {
      return;
    }

    addNote(selectedGroup.id, newNote);
    setSelectedGroup({
      ...selectedGroup,
      notes: [...selectedGroup.notes, newNote],
    });
    setNote("");
  };
  return (
    <div
      className={styles["home-container"]}
      style={{ display: isMobile && selectedGroup ? "flex" : "" }}
    >
      {selectedGroup !== null ? (
        <div className={styles["notes-screen"]}>
          <div className={styles["group-name-container"]}>
            <FaArrowLeft
              onClick={() => setSelectedGroup(null)}
              className={styles["left-arrow"]}
            />
            <div
              className={styles["initials"]}
              style={{ backgroundColor: selectedGroup.color }}
            >
              {selectedGroup.initials}
            </div>
            <div className={styles["name"]}>{selectedGroup.name}</div>
          </div>
          <div className={styles["notes-container"]}>
            {selectedGroup.notes.map((Note) => {
              return (
                <div className={styles["note-container"]}>
                  <div className={styles["note"]}>{Note.note}</div>
                  <div className={styles["date-time"]}>
                    {Note.date}
                    <div className={styles["dot"]}></div>
                    {Note.time}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles["form-container"]}>
            <textarea
              value={note}
              placeholder="Enter your text here..........."
              rows={5}
              cols={100}
              onChange={(e) => setNote(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
               className={styles["send"]}
              onClick={handleSubmit}
              disabled={!note.trim()}
              style={{
                background: "transparent",
                border: "none",
                padding: "4px",
                cursor: note.trim() ? "pointer" : "not-allowed",
                opacity: note.trim() ? 1 : 0.5,
              }}
            >
              <IoSend size={isMobile?20:32} color={note.trim()==="" ? "#ABABAB" : "#001F8B"} />
            </button>
            
          </div>
        </div>
      ) : (
        <div className={styles["home-screen"]}>
          <div className={styles["upper-container"]}>
            <img src={Image} />
            <h2>Pocket Notes</h2>
            <div className={styles["span-para"]}>
              <span>
                Send and receive messages without keeping your phone online.
              </span>
              <span>
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </span>
            </div>
          </div>
          <div className={styles["lower-container"]}>
            <FaLock />
            <p>end-to-end encrypted</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
