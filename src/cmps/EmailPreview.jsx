import { Icon } from './Icon';

export function EmailPreview({ emailPreview, onOpenMailDetails }) {

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(emailPreview.sentAt);
    const imgPath = 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x'

    return (
        <tr onClick={() => onOpenMailDetails(emailPreview)}>
            <td><input type="checkbox" /></td>
            <td><Icon iconData={{ src: imgPath + '/star_baseline_nv700_20dp.png', style: 'remove-padding' }} /> </td>
            <td><Icon iconData={{ src: imgPath + '/label_important_fill_googyellow500_20dp.png', style: 'remove-padding' }} /> </td>
            <td>{emailPreview.subject} </td>
            <td>{emailPreview.body} </td>
            <td>{formattedDate}</td>
        </tr>
    )
}