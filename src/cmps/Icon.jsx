export function Icon({ iconData }) {
    return (
        <div>
            <img className={`menu-icon icon-hover ${iconData.style}`}
                src={iconData.src}
                alt={iconData.alt}
            />
        </div>
    )
}