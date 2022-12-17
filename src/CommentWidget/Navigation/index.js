import "./index.scss"
import image from '../../Assets/profile.jpg'

export default function Navigation() {

    return (
        <div className="navigation">
            <div className="navigation-menu-items">
                <div className="navigation-menu">
                    <i className="bi bi-list"></i>
                </div>
                <div className="navigation-logo-items">
                    <div className="navigation-logo">
                        <i className="bi bi-youtube"></i>
                    </div>
                    <h3 className="navigation-logo-content">YouTube</h3>
                </div>
            </div>

            <div className="navigation-search-box-items">
                <div className="navigation-search-box">
                    <input className="navigation-input"
                        type="search"
                        placeholder="Search..."
                    />
                    <div className="navigation-search-icon">
                        <p className="navigation-button">Search</p>
                    </div>
                </div>
                <div className="navigation-search-box-voice-icon">
                    <i className="bi bi-mic-fill"></i>
                </div>
            </div>

            <div className="navigation-profile-items">
                <div className="navigation-profile-items-video-icon">
                    <i className="bi bi-camera-video"></i>
                </div>
                <div className="navigation-profile-items-notification-icon">
                    <i className="bi bi-bell"></i>
                </div>
                <div className="navigation-profile">
                    <img src={image} alt='..loading ' />
                </div>
            </div>
        </div>

    )
}