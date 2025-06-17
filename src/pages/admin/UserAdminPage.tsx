import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

import UserGrid from "../../components/admin/UserManagermentComponent/UserGrid";
import UserDetailModal from "@/components/admin/UserManagermentComponent/UserDetail.tsx";
import EditUserModal from "../../components/admin/UserManagermentComponent/EditUserModal";
import type {User} from "src/components/data/User";
import UserDeleteModal from "@/components/admin/UserManagermentComponent/UserDeleteModal.tsx";


const initialUserData: User[] = [
    {
        id: "u1",
        name: "Hà Huỳnh Huy Tuấn",
        role: "UserVip",
        email: "tuanhhhts00576@fpt.edu.vn",
        phone: "0912345678",
        status: "Active",
        profile: "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-1/257642312_126047453186430_5286367398492986357_n.jpg?stp=c198.0.340.340a_dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeE68_S1eKs7hO1mkjACRkWdm6LFfaD2k5ObosV9oPaTk-wrx4yB4E7K7IFoyvCEprc0bn6fO4P7wXgxMfAW49Xa&_nc_ohc=QlobBet6CAEQ7kNvwHX-xTc&_nc_oc=AdnGCf3DyTUC8nmGNrJsHYtGkV-6UcJnHXMcHv8AHJYP7BKxsp6W1kQmZKP5RVum55Q&_nc_zt=24&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=_LS7FWnd0RtDDhhVr2fm5g&oh=00_AfM9SA7R3Qma_TBsPLXDgph6vcQcDOu-qbseXnSNz0EwCw&oe=6851F4AA"
    },
    {
        id: "u2",
        name: "Phạm Tấn Tài",
        role: "Admin",
        email: "taiptts00522@fpt.edu.vn",
        phone: "0987654321",
        status: "Active",
        profile: "https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-1/499983208_704778998701144_4800080544000272268_n.jpg?stp=c219.0.563.563a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFQ6koQqgrys_xkT2NlNqU2C-FROzLrMfwL4VE7Musx_CAWS2dX4F2ZEP4udrUc_Tth4xYrGRC-5HOu2uCAvd_j&_nc_ohc=qHhVxsRrWCoQ7kNvwF4AfDm&_nc_oc=AdkOLWqOhm0GZlZMJYpYNqcsdnYdgAxD05jwWPSWgLAEFSe4d6DTc0M7V6ujLk1ZI0M&_nc_zt=24&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=dj3a9mbTEoW2iG9eBNhkBA&oh=00_AfMZPP0Kd7Ksc6WKwFWFwFHdr1pI2lucXqH2n013NfVxvg&oe=6851FE4B"
    },
    {
        id: "u3",
        name: "Trương Anh Đức",
        role: "Moderator",
        email: "ductats526@fpt.edu.vn",
        phone: "0933555777",
        status: "Active",
        profile: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-1/458967570_1022781829542547_4737684728337759529_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEhezeL5TS608Arjxhoa9UHc18nlaRvVGFzXyeVpG9UYdnh5mK04Jxubij8VBl9N5vVIEevMhOPqTKefCW58Slf&_nc_ohc=Oc0lPyTjv-4Q7kNvwFVaytP&_nc_oc=AdnB2RGG7VopFBhx0O2KUudVXP4DC9twY2PUfhMeYFHq7ZARLppKZn_MeSyTuHe3tcA&_nc_zt=24&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=vZ_iphO67jj7m6FCjKW51A&oh=00_AfPFIAVjOGh7XvFGwAt_im9rHMCdP6zfoch8eAlvwwSswg&oe=6851EEB3"
    },
    {
        id: "u4",
        name: "Đoàn Trọng Phát",
        role: "User",
        email: "phatdtps00897@fpt.edu.vn",
        phone: "0909090909",
        status: "Banned",
        profile: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-1/474092824_1108429527446420_6044221638730175301_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeF61x7G3xvKwvL9SGXA12SRm2X8sHYVH_qbZfywdhUf-iAKirTs2YcSJj68rwtRRo8mrYTck8LVd0jCMMreR1EO&_nc_ohc=6z1-a5OXlnIQ7kNvwGhhqNr&_nc_oc=AdnYbeBceeV1qtNVToJ1RHPNWPudOaBQcS06Lbt_PY2ck5dRcGHPz_vN8b3mcd4DPqg&_nc_zt=24&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=vxZuqSVA5acPnZYuGJcraA&oh=00_AfP6NKAwG3Bqm-odu5TM-R3hmVwhOnLx1MXA9Tbor9qIFQ&oe=6851CD80"
    },
    {
        id: "u5",
        name: "Đinh Phạm Lê Hoàng",
        role: "Admin",
        email: "hoangdplts500@fpt.edu.vn",
        phone: "0922334455",
        status: "Active",
        profile: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-1/487711845_1027629999248318_832100537783520993_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeF0U8wYltUTzUXGU_jvzZnfhFUHx6Opv8CEVQfHo6m_wAMOEMP6UoqQFMyolMQ73GMLPT3g-OntTA8RkkTWBtmz&_nc_ohc=w3HFwLWEZ8gQ7kNvwEwsntC&_nc_oc=Admak2TyCvxNPiHRjaFFUwZlax_z3aGeMp1yvVYQS57DqD6i9es11tE9M5IXD0qx-M4&_nc_zt=24&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=O-uiQtZUlPJ36adza-hq0Q&oh=00_AfO3v0K-e6xzshdMRKP-NdrFeMGyBFcemVD18pKoEfVkwg&oe=6851F99A"
    }
];


export default function UserAdminPage() {
    const navigate = useNavigate();
    const { id } = useParams() as { id?: string };

    const [userData, setUserData] = useState<User[]>(initialUserData);
    const [editUserId, setEditUserId] = useState<string | null>(null);
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const selectedUser = id ? userData.find((u) => u.id === id) || null : null;
    const editUserData = editUserId ? userData.find((u) => u.id === editUserId) || null : null;

    const handleSelectUser = (userId: string) => {
        navigate(`/admin/users/${userId}`);
    };

    const handleBack = () => {
        navigate("/admin/users");
    };

    const handleEditUser = (userId: string) => {
        setEditUserId(userId);
    };

    const handleCloseEdit = () => {
        setEditUserId(null);
    };

    const handleAddUser = (newUser: Omit<User, "id">) => {
        const newUserWithId: User = { ...newUser, id: uuidv4() };
        setUserData((prev) => [...prev, newUserWithId]);
    };

    const handleDeleteUser = (userId: string) => {
        setDeleteUserId(userId);
        setShowDeleteModal(true);
    };

    const confirmDeleteUser = () => {
        if (deleteUserId) {
            setUserData((prev) => prev.filter((u) => u.id !== deleteUserId));
            if (id === deleteUserId) {
                handleBack(); // Nếu đang ở trang detail
            }
        }
        setShowDeleteModal(false);
        setDeleteUserId(null);
    };

    const handleUpdateUser = (updatedUser: User) => {
        setUserData((prev) =>
            prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        handleCloseEdit();
    };

    return (
        <div>
            {!id && (
                <UserGrid
                    users={userData}
                    onSelectUser={handleSelectUser}
                    onAdd={handleAddUser}
                    onEdit={(user) => handleEditUser(user.id)}
                    onDelete={(userId) => handleDeleteUser(userId)}
                />
            )}

            {id && selectedUser && (
                <UserDetailModal
                    isOpen={!!id}
                    user={selectedUser}
                    onClose={handleBack}
                    onEdit={(user) => handleEditUser(user.id)}
                    onDelete={(userId) => handleDeleteUser(userId)}
                />
            )}

            {editUserData && (
                <EditUserModal
                    user={editUserData}
                    onClose={handleCloseEdit}
                    onSave={handleUpdateUser}
                />
            )}

            {showDeleteModal && deleteUserId && (
                <UserDeleteModal
                    userName={
                        userData.find((u) => u.id === deleteUserId)?.name || "người dùng"
                    }
                    onClose={() => {
                        setShowDeleteModal(false);
                        setDeleteUserId(null);
                    }}
                    onConfirm={confirmDeleteUser}
                />
            )}
        </div>
    );
}
