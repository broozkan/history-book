import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Swal from 'sweetalert2'

const FormImportStaff = (props) => {

    const [state, setState] = useState({
        staff_school_number_column:'',
        staff_gender_column:'',
        staff_nationality_column:'',
        staff_name_surname_column:'',
        staff_birthday_column:'',
        staff_country_column:'',
        staff_father_name_column:'',
        staff_education_year_column:'',
        staff_middle_graduation_result_column:'',
        staff_high_school_graduation_result_column:'',
        staff_high_school_graduation_exam_column:'',
        staff_description_column:'',
        is_form_submitting: false

    })




    const resetState = () => {
        setState({
            staff_school_number_column:'',
            staff_gender_column:'',
            staff_nationality_column:'',
            staff_name_surname_column:'',
            staff_birthday_column:'',
            staff_country_column:'',
            staff_father_name_column:'',
            staff_education_year_column:'',
            staff_middle_graduation_result_column:'',
            staff_high_school_graduation_result_column:'',
            staff_high_school_graduation_exam_column:'',
            staff_description_column:'',
            is_form_submitting: false
        })
    }


    const handleChange = (e) => {
        if(e.target.type === "file"){
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            })
        }else{
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setState({
            ...state,
            is_form_submitting: true
        })

        let formData = new FormData()

    
        await formData.append('file', state.excel_file)
        await formData.append('data', JSON.stringify(state))

        
        let submitResponse
        submitResponse = await api.post('/excel/import/staff', formData, { headers: {'content-type':'multipart/form-data'}})
       // resetState()

        if(submitResponse.data.response){
            Swal.fire({
                title: 'Başarılı',
                text: 'Aktarım tamamlandı',
                icon: 'success'
            })
        }else{
            Swal.fire({
                title: 'Hata',
                text: submitResponse.data.responseData,
                icon: 'error'
            })

        }

        


    }

    // render card loader
    let cardLoaderHtml = ''
    if (state.is_form_submitting) {
        cardLoaderHtml = <CardLoader />
    }else{
        cardLoaderHtml = ''
    }




    return (
        <div class="card">
            {cardLoaderHtml}
            <div class="card-header">
                <span class="h4">Personel Excel Aktarım Formu</span>
                <p class="text-muted">Excel dosyanızdaki kolonlar ile eşleşme yaparak çoklu personel ekleyebilirsiniz</p>
            </div>
            <div class="card-body">
                <form id="form1" class="form-validate" novalidate="novalidate" onSubmit={handleSubmit}>
                    <div class="h5 mb-4">Aktarım Bilgileri</div>
                   
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="excel_file">Excel Dosyası (*)</label>
                            <input type="file" class="form-control" onChange={handleChange} name="excel_file" id="excel_file" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="staff_gender_column">Cinsiyet Kolonu <sup>"E" ve "K" şeklinde ayrılmıştır </sup> (*)</label>
                            <input type="text" class="form-control" value={state.staff_gender_column} onChange={handleChange} name="staff_gender_column" id="staff_gender_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                 
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="staff_name_surname_column">Ad Soyad Kolonu <sup>boşluk olması halinde sistem ad soyad ayıracaktır</sup> (*)</label>
                            <input type="text" class="form-control" value={state.staff_name_surname_column} onChange={handleChange} name="staff_name_surname_column" id="staff_name_surname_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="staff_birthday_column">Doğum Yılı Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.staff_birthday_column} onChange={handleChange} name="staff_birthday_column" id="staff_birthday_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="staff_country_column">Doğum Yeri Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.staff_country_column} onChange={handleChange} name="staff_country_column" id="staff_country_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="staff_father_name_column">Baba Adı Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.staff_father_name_column} onChange={handleChange} name="staff_father_name_column" id="staff_father_name_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="staff_branch_column">Branş Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.staff_branch_column} onChange={handleChange} name="staff_branch_column" id="staff_branch_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="staff_duty_column">Görev Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.staff_duty_column} onChange={handleChange} name="staff_duty_column" id="staff_duty_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="staff_duty_year_column">Görev Süresi Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.staff_duty_year_column} onChange={handleChange} name="staff_duty_year_column" id="staff_duty_year_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                   
                    <button type="submit" class="btn m-t-30 mt-3">Kaydet</button>
                    <a href="/admin/staff/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                </form>
            </div>
        </div>
    )

}

export default FormImportStaff