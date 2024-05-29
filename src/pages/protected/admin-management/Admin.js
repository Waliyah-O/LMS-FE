import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import Admin from '../../../features/AdminManagement'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Admin"}))
      }, [])


    return(
        <Admin/>
    )
}

export default InternalPage