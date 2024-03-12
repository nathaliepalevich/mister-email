import { useState } from 'react';
import { emailService } from '../services/email.service';
import { PrevMailActionBtn } from './PrevMailActionBtn';
import { Icon } from './Icon';
import path from '../services/image-path'
export function EmailPreview({ emailPreview, onOpenMailDetails }) {
    const [isStarred, setIsStarred] = useState(emailPreview.isStarred)
    const [isHovered, setIsHovered] = useState(false)
    const [isSelectet, setIsSelected] = useState(false)

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(emailPreview.sentAt);
    const starImg = isStarred ? path.starFillImg : path.starImg

    async function handleStarChange(ev) {
        ev.stopPropagation()
        await emailService.save({ ...emailPreview, isStarred: !emailPreview.isStarred })
        setIsStarred(!isStarred)
    }

    function handleHoveToggle() {
        setIsHovered(!isHovered)
    }

    function onHandleOpenMailDetails(ev, selected) {
        ev.stopPropagation()
        onOpenMailDetails(emailPreview, '')
    }
    function onToggleSelectEmail(ev, selected) {
        setIsSelected(ev.target.checked)
        onOpenMailDetails(selected, 'checkboxSelected', ev.target.checked)
        ev.stopPropagation()
    }
    return (
        <tr className={emailPreview.isRead ? '' : 'bold'}
            onClick={(ev) => onHandleOpenMailDetails(ev, emailPreview)}
            onMouseEnter={handleHoveToggle}
            onMouseLeave={handleHoveToggle}
        >
            <td><input type="checkbox" onClick={(ev) => onToggleSelectEmail(ev, emailPreview)} /></td>
            <td onClick={handleStarChange}>
                <Icon iconData={{ src: starImg, style: 'remove-padding' }} /> </td>
            <td>{emailPreview.subject} </td>
            <td><div className='text-preview'>{emailPreview.body}</div> </td>
            <td>
                {!isHovered ? <div>{formattedDate}</div> : <PrevMailActionBtn path={path} />}
            </td>
        </tr>
    )
} 