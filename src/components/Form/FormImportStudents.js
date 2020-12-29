import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Swal from 'sweetalert2'

const FormImportStudent = (props) => {

    const [state, setState] = useState({
        student_school_number_column:'',
        student_gender_column:'',
        student_nationality_column:'',
        student_name_surname_column:'',
        student_birthday_column:'',
        student_country_column:'',
        student_father_name_column:'',
        student_education_year_column:'',
        student_middle_graduation_result_column:'',
        student_high_school_graduation_result_column:'',
        student_high_school_graduation_exam_column:'',
        student_description_column:'',
        is_form_submitting: false

    })




    const resetState = () => {
        setState({
            student_school_number_column:'',
            student_gender_column:'',
            student_nationality_column:'',
            student_name_surname_column:'',
            student_birthday_column:'',
            student_country_column:'',
            student_father_name_column:'',
            student_education_year_column:'',
            student_middle_graduation_result_column:'',
            student_high_school_graduation_result_column:'',
            student_high_school_graduation_exam_column:'',
            student_description_column:'',
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
        submitResponse = await api.post('/excel/import/student', formData, { headers: {'content-type':'multipart/form-data'}})
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
                <span class="h4">Öğrenci Excel Aktarım Formu</span>
                <p class="text-muted">Excel dosyanızdaki kolonlar ile eşleşme yaparak çoklu öğrenci ekleyebilirsiniz</p>
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
                            <label for="student_school_number_column">Okul Numarası Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.student_school_number_column} onChange={handleChange} name="student_school_number_column" id="student_school_number_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_gender_column">Cinsiyet Kolonu <sup>"E" ve "K" şeklinde ayrılmıştır </sup> (*)</label>
                            <input type="text" class="form-control" value={state.student_gender_column} onChange={handleChange} name="student_gender_column" id="student_gender_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_nationality_column">Uyruk Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.student_nationality_column} onChange={handleChange} name="student_nationality_column" id="student_nationality_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_name_surname_column">Ad Soyad Kolonu <sup>boşluk olması halinde sistem ad soyad ayıracaktır</sup> (*)</label>
                            <input type="text" class="form-control" value={state.student_name_surname_column} onChange={handleChange} name="student_name_surname_column" id="student_name_surname_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_birthday_column">Doğum Yılı Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.student_birthday_column} onChange={handleChange} name="student_birthday_column" id="student_birthday_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_country_column">Doğum Yeri Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.student_country_column} onChange={handleChange} name="student_country_column" id="student_country_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_father_name_column">Baba Adı Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.student_father_name_column} onChange={handleChange} name="student_father_name_column" id="student_father_name_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_middle_school_graduation_result_column">Ortaokul Mezuniyet Durumu Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.student_middle_school_graduation_result_column} onChange={handleChange} name="student_middle_school_graduation_result_column" id="student_middle_school_graduation_result_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_education_year_column">Öğretim Yılı Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.student_education_year_column} onChange={handleChange} name="student_education_year_column" id="student_education_year_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_high_school_graduation_result_column">Lise Mezuniyet Durumu Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.student_high_school_graduation_result_column} onChange={handleChange} name="student_high_school_graduation_result_column" id="student_high_school_graduation_result_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_high_school_graduation_exam_column">Lise Mezuniyet İmtihanı Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.student_high_school_graduation_exam_column} onChange={handleChange} name="student_high_school_graduation_exam_column" id="student_high_school_graduation_exam_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_description_column">Açıklama Kolonu (*)</label>
                            <input type="text" class="form-control" value={state.student_description_column} onChange={handleChange} name="student_description_column" id="student_description_column" placeholder="Kolon numarası giriniz" required="" />
                        </div>
                    </div>
                    <button type="submit" class="btn m-t-30 mt-3">Kaydet</button>
                    <a href="/admin/student/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                </form>
            </div>
        </div>
    )

}

export default FormImportStudent