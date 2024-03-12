import { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router';

import { EmailDetails } from './EmailDetails.jsx';
import { EmailList } from './EmailList.jsx';
import { MainHeader } from './MainHeader.jsx';
export function Main({ emails, filterByStatus, handleIconClicked }) {
    const [emailDetails, setEmailDetails] = useState(null)
    const [selectedEmails, setSelectedEmails] = useState([])
    const [isToggle, setIsToggle] = useState(null)
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        setEmailDetails(null)
    }, [emails, isToggle])

    function onEmailDetails(email, isToggle, checked) {
        if (isToggle) {
            // const selectedEmailsCopy = [...selectedEmails]
            // const existId = selectedEmails.findIndex(selected => selected.id === email.id)
            // if (existId > -1) {
            //     selectedEmailsCopy.splice(selectedEmailsCopy[existId] + 1, 1)
            // } else {
            //     selectedEmailsCopy.push(email)
            // }
            // setSelectedEmails(selectedEmailsCopy)
            // setIsToggle(isToggle)

        } else {
            setEmailDetails(email)
            navigate(`${location.pathname}/${email.id}`)
        }
    }

    function handleBack() {
        setEmailDetails(null)
    }


    return (
        <div className='main'>
            <MainHeader onSelected={filterByStatus} onIconClicked={handleIconClicked} showActions={selectedEmails.length} />
            {!emails?.length && (<div>No emails found</div>)}
            {emailDetails && !isToggle && <EmailDetails onBackBtnClick={handleBack} />}
            {!emailDetails && <EmailList emails={emails} emailDetails={onEmailDetails} />}
            <Outlet />

        </div>
    )
}