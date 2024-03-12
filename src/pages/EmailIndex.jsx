import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { emailService } from '../services/email.service'

import { Main } from "../cmps/Main.jsx";
import { RightSide } from '../cmps/RightSide.jsx';
import { AppHeader } from '../cmps/AppHeader.jsx'
import { LeftSide } from '../cmps/LeftSide.jsx';

export function EmailIndex() {
    const location = useLocation();
    const navigate = useNavigate();

    const [emails, setEmails] = useState(null)
    const [error, setError] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter(location.pathname))

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        if (fieldsToUpdate.mail === 'compose') {
            navigate(`${location.pathname}/compose`)
        }
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }));
    }
    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
            setError(null)
        } catch (err) {
            setError(err)
        }
    }

    function handleIconClicked(type) {
        // console.log(type);
    }

    if (error) return (<div>
        <h1>Oops... Somthing went wrong</h1>
        <p>{error}</p>
    </div>)

    return (
        <div className='email-index'>
            <AppHeader filterBy={filterBy} onSetFilter={onSetFilter} />
            <LeftSide onFilterBy={onSetFilter} />
            <Main emails={emails} filterByStatus={onSetFilter} handleIconClicked={handleIconClicked} />
            <RightSide />
        </div>
    )
}