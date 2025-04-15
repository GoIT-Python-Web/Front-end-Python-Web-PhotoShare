import s from "./UsersItem.module.css";
import Icon from "../../../common/icons/Icon";
import getColorFromName from "../../../../helpers/getColorFromName";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useScrollLock } from "../../../../helpers/hooks/useScrollLock";
import Modal from "../../../modals/modal/Modal.jsx";
import { banUser, toggleUserRole } from "../../../../store/users/operations.js";
import { GoBlocked } from "react-icons/go";

function UserItem({
  id,
  is_active,
  profileImage = null,
  profileAlt = "Profile picture",
  userName = "User Name",
  email = "email@example.com",
  dateTime = "DD.MM.YY HH:MM",
  role = "user",
}) {
  const [showModal, setShowModal] = useState(false);
  useScrollLock(showModal);

  const dispatch = useDispatch();

  const buttonRef = useRef(null);
  // console.log(is_active);

  const handleModalClick = () => {
    setShowModal(!showModal);
  };

  const handleRoleChange = () => {
    dispatch(toggleUserRole(id));
    setShowModal(false);
  };

  const [localActive, setLocalActive] = useState(is_active);

  const handleBan = () => {
    Swal.fire({
      title: "Are you sure?",
      text: localActive
        ? "This user will be banned!"
        : "This user will be unbanned!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: localActive ? "Yes, ban them" : "Yes, unban them",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (role === "admin" && localActive) {
          Swal.fire({
            title: "Admin",
            text: "Cannot ban an Admin!",
            icon: "warning",
          });
          return;
        }
        setLocalActive(!localActive);
        dispatch(banUser(id));
        setShowModal(false);
      }
    });
  };

  const isBanned = !localActive;

  return (
    <div className={s.userItem}>
      <div className={s.userItemContainer}>
        <div className={s.mobileWrapper}>
          <div className={s.profileImageContainer}>
            {typeof profileImage === "string" &&
            profileImage.trim() !== "" &&
            profileImage !== "null" &&
            profileImage !== "undefined" ? (
              <img
                src={profileImage}
                alt={profileAlt}
                className={s.profileImage}
              />
            ) : (
              <div
                className={s.initialAvatar}
                style={{ backgroundColor: getColorFromName(userName) }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className={s.mobileContainer}>
            <div className={s.pickname}>
              <span data-label={isBanned && "banned"} className={s.profileName}>
                {userName}
              </span>
              <div className={s.settingsSection}>
                <button className={s.adminIconButton}>
                  {!isBanned ? (
                    <Icon
                      className={s.admIcon}
                      name={role === "admin" ? "shield" : "user"}
                      width="16"
                      height="16"
                    />
                  ) : (
                    <Icon name="banned" className={s.banned} />
                  )}
                </button>
              </div>
            </div>
            <div className={s.mobilEmailSection}>
              {!isBanned ? (
                <>
                  <div className={s.emailSection}>{email}</div>
                  <div className={s.timestampSection}>{dateTime}</div>
                </>
              ) : (
                <p className={s.banMessage}>Користувача заблоковано</p>
              )}
            </div>
          </div>
        </div>
        <div className={s.actionsSection}>
          <button className={s.iconButton} onClick={handleBan}>
            <Icon
              className={s.icons}
              name={!isBanned ? "ban" : "banned_tick"}
            />
          </button>
          {!isBanned ? (
            <button className={s.iconButton} onClick={handleRoleChange}>
              <Icon name="user-role" className={s.icons} />
            </button>
          ) : (
            <button className={s.modalBtnGrey}>
              <Icon name="user-role" className={s.modalBtnGrey} />
            </button>
          )}
          <button
            ref={buttonRef}
            className={`${s.iconButton} ${s.dotsOnlyMobile}`}
            onClick={handleModalClick}
          >
            <Icon name="dots" width="5" height="22" />
          </button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="sm"
        className={s.customUserModal}
      >
        <button className={s.closeModal} onClick={() => setShowModal(false)}>
          <Icon name="xclose" />
        </button>
        <button
          onClick={handleRoleChange}
          className={!isBanned ? s.modalBtn : s.modalBtnDel}
        >
          <Icon
            name={"user-role"}
            className={!isBanned ? s.profileName : s.modalBtnDel}
          />
          Змінити Роль
        </button>
        {!isBanned ? (
          <button onClick={handleBan} className={s.modalBtn}>
            <Icon name="ban" /> Забанити Користувача
          </button>
        ) : (
          <button onClick={handleBan} className={s.modalBtn}>
            <Icon name="banned_tick" /> Розблокувати Користувача
          </button>
        )}
        <button className={isBanned ? s.modalBtnGrey : s.modalBtnDel}>
          <Icon name="user-role" /> Змінити роль
        </button>
      </Modal>
    </div>
  );
}

export default UserItem;
