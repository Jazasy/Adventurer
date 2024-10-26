import "./ProfileHead.css";
import Loader from "../Loader/Loader";
import { forwardRef } from "react";
import { useEffect } from "react";

const ProfileHead = forwardRef(
	({ className, fetchedUser, updateWidth }, ref) => {
		useEffect(() => {
            const handleResize = () => {
                updateWidth();
            };

            // Frissítés az oldal betöltésekor
            updateWidth();

            // ResizeObserver létrehozása
            const resizeObserver = new ResizeObserver(handleResize);

            // Figyeljük a konténer méretének változását
            if (ref.current) {
                resizeObserver.observe(ref.current);
            }

            // Eseményfigyelő eltávolítása a komponens unmountolásakor
            return () => {
                if (ref.current) {
                    resizeObserver.unobserve(ref.current);
                }
            };
        }, [updateWidth, ref]);

		return (
			<header className="profile-head" ref={ref}>
				{fetchedUser ? (
					<>
						<img
							className={className}
							src={fetchedUser.pfp}
							alt="profile head thumbnail image"
						/>
						<h1>{fetchedUser.username}</h1>
					</>
				) : (
					<Loader className="loader-bigger" />
				)}
			</header>
		);
	}
);

ProfileHead.displayName = "ProfileHead";

export default ProfileHead;
