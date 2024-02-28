import { useState } from 'react';
import { EmailDetails } from './EmailDetails.jsx';
import { EmailList } from "./EmailList.jsx";
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom'

export function Main({ emails }) {

    const [selectedEmail, setSelectedEmail] = useState(null)
    const navigate = useNavigate()
    const location = useLocation();

    function emailDetails(email) {
        setSelectedEmail(email)
        navigate(`${location.pathname}/${email.id}`)
    }
    return (
        <div className='main'>
            <div className='action-bar'>
                <input type="checkbox" />
                <div className="refresh"></div>
            </div>
            {!emails?.length && (<div>No emails found</div>)}
            {!selectedEmail ? <EmailList emails={emails} emailDetails={emailDetails} />
                : <EmailDetails emailDetails={selectedEmail} />
            }
        </div>
    )
}