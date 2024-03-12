import { Icon } from './Icon';
import path from '../services/image-path'
export function RightSide() {
    const icons = [
        { src: path.calendar, alt: 'google_calendar_icon' },
        { src: path.keep, alt: 'google_keep_icon' },
        { src: path.tasks, alt: 'google_tasks_icon' },
        { src: path.contacts, alt: 'google_contacts_icon' }]
    return (
        <div className='right-side'>
            {icons.map((icon, index) => {
                return <Icon iconData={icon} key={index} />
            })}
        </div>
    )
}