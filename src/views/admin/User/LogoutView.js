import React, { useEffect, useState } from 'react'

const LogoutView = () => {


    useEffect(()=>{
        logout()
    },[])


    const logout = async () => {
        await localStorage.clear()
    }


    return (
        <div class="container">
            <div className="text-center mt-5">
                <h3 className="text-center">Oturumunuz kapatılmıştır</h3>
                <a className="text-center" href="/admin/user/login/">Tekrar giriş yapın</a>
            </div>
        </div>
    )
}

export default LogoutView