import googleCalendar from '../assets/imgs/google-calendar.svg'
import googleKeep from '../assets/imgs/google-keep.svg'
import googleTasks from '../assets/imgs/google-tasks.svg'
import googleContacts from '../assets/imgs/google-contacts.svg'
import { Icon } from './Icon';

export function RightSide() {
    const icons = [
        { src: googleCalendar, alt: 'google_calendar_icon' },
        { src: googleKeep, alt: 'google_keep_icon' },
        { src: googleTasks, alt: 'google_tasks_icon' },
        { src: googleContacts, alt: 'google_contacts_icon' }]
    return (
        <div className='right-side'>
            {icons.map((icon, index) => {
                return <Icon iconData={icon} key={index} />
            })}
        </div>
    )
}