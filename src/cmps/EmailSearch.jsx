import { useState, useEffect } from 'react'

export function EmailSearch({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        setFilterByToEdit(filterBy)
    }, [filterBy])

    function handleTypeChange(ev) {
        const { value } = ev.target
        setFilterByToEdit(prevFilter => {
            return { ...prevFilter, searchStr: value }
        })
    }
    function onSubmit(ev) {
        const { keyCode } = ev
        if (keyCode === 13) {
            onSetFilter(filterByToEdit)
        }
    }
    return (
        <div className='email-search'>
            <label>
                <input placeholder='Search mail' type="text"
                    value={filterByToEdit.searchStr}
                    onKeyDown={onSubmit}
                    onChange={handleTypeChange} />
            </label>
        </div>
    )
}