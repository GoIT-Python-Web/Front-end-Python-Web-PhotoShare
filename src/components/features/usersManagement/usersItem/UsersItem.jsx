import s from "./UsersItem.module.css";
import Icon from "../../../common/icons/Icon";
import getColorFromName from "../../../../helpers/getColorFromName";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useScrollLock } from "../../../../helpers/hooks/useScrollLock";
import Modal from "../../../modals/modal/Modal.jsx";
import { banUser, toggleUserRole } from "../../../../store/users/operations.js";

function UserItem({
  id,
  profileImage = null,
  profileAlt = "Profile picture",
  userName = "User Name",
  email = "email@example.com",
  dateTime = "DD.MM.YY HH:MM",
  onDelete,
  role = "user",
}) {
  const [showModal, setShowModal] = useState(false);
  useScrollLock(showModal);

  const dispatch = useDispatch();

  const buttonRef = useRef(null);

  const handleModalClick = () => {
    setShowModal(!showModal);
  };

  const handleRoleChange = () => {
    dispatch(toggleUserRole(id));
    setShowModal(false);
  };

  const handleBan = () => {
    dispatch(banUser(id));
    setShowModal(false);
  };

  const handleDelete = () => {
    onDelete(id);
    setShowModal(false);
  };

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
              <span className={s.profileName}>{userName}</span>
              <div className={s.settingsSection}>
                <button className={s.adminIconButton}>
                  <Icon
                    className={s.admIcon}
                    name={role === "admin" ? "shield" : "user"}
                    width="16"
                    height="16"
                  />
                </button>
              </div>
            </div>
            <div className={s.mobilEmailSection}>
              <div className={s.emailSection}>{email}</div>
              <div className={s.timestampSection}>{dateTime}</div>
            </div>
          </div>
        </div>
        <div className={s.actionsSection}>
          <button className={s.iconButton} onClick={handleBan}>
            <Icon name="ban" className={s.icons} />
          </button>
          <button className={s.iconButton} onClick={handleRoleChange}>
            <Icon name="user-role" className={s.icons} />
          </button>
          <button className={s.iconButton} onClick={handleDelete}>
            <Icon name="trash" className={s.icons} />
          </button>

          {/* Кнопка три крапки — тільки на мобільній версії */}
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
        <button onClick={handleRoleChange} className={s.modalBtn}>
          <Icon name="user-role" /> Змінити Роль
        </button>
        <button onClick={handleDelete} className={s.modalBtn}>
          <Icon name="trash" /> Видалити Профіль
        </button>
        <button onClick={handleBan} className={s.modalBtn}>
          <Icon name="ban" /> Забанити Користувача
        </button>
      </Modal>
    </div>
  );
}

export default UserItem;
