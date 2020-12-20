import React from 'react'


const FormSearchStaff = () => {
    return(
        <form>
            <div className="form-group">
                <label for="staff_name">Personel Adı</label>
                <input className="form-control" name="staff_name" id="staff_name" placeholder="Personel adı giriniz" />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" type="submit">Ara</button>
            </div>
        </form>
    )
}

export default FormSearchStaff