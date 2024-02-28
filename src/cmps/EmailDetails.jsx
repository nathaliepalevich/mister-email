import { Icon } from './Icon';
export function EmailDetails({ emailDetails }) {
    return (
        <div className='email-details'>
            <div>
                <Icon iconData={{ src: 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/arrow_back_baseline_nv700_20dp.png' }} />
            </div>
            <div className='email-details-header flex space-between align-center'>
                <h2 className='email-details-header-title'>{emailDetails.subject}</h2>
            </div>
            <div className='email-details-body'>
                <div className='img-container'>
                    <img src="https://lh3.googleusercontent.com/a/default-user=s40-p" alt="" />
                </div>
                <main>
                    <div className='mail-info'>
                        <p>{emailDetails.from}</p>
                        <p className='email-details-header-date'>{emailDetails.sentAt}</p>
                    </div>
                    <p>{emailDetails.body}</p>
                </main>
            </div>
        </div>
    )
}