import { Link, NavLink, Outlet } from "react-router-dom";

export function LeftSide({ onFilterBy }) {
    const navigationLinks = [
        { to: 'inbox', name: 'Inbox', icon: 'inbox_fill_baseline_n900_20dp.png' },
        { to: 'sent', name: 'Sent', icon: 'send_baseline_nv700_20dp.png' },
        { to: 'starred', name: 'Starred', icon: 'star_baseline_nv700_20dp.png' },
        { to: 'drafts', name: 'Drafts', icon: 'draft_baseline_nv700_20dp.png' },
        { to: 'trash', name: 'Trash', icon: 'delete_baseline_nv700_20dp.png' },
    ]
    return (
        <div className='left-side'>
            <button className="compose-btn">
                <img height={20} width={20} src="https://www.gstatic.com/images/icons/material/system_gm/1x/create_gm_grey_24dp.png" alt="" />
                Compose
            </button>
            <nav>
                {navigationLinks.map((status, index) => {
                    return <NavLink key={index} to={`/${status.to}`} onClick={() => onFilterBy(status.to)}>
                        <img height={20} width={20} src={`https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/${status.icon}`} alt={status.name} />
                        <span>{status.name}</span>
                    </NavLink>

                })}
            </nav>
            <Outlet />
        </div>
    )
}