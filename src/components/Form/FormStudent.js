import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Swal from 'sweetalert2'
import { fixdate } from '../../services/fixdate'

const FormStudent = (props) => {

    const [state, setState] = useState({
        student_name:'',
        student_surname:'',
        student_father_name:'',
        student_photo:'',
        student_gender:'',
        student_birthday:'',
        student_nationality:'',
        student_school_number:'',
        student_book_number:'',
        student_middle_school_graduation_date:'',
        student_middle_school_graduation_result:'',
        student_high_school_graduation_date:'',
        student_high_school_graduation_result:'',
        is_form_submitting: false
    })


    useEffect(()=>{
        if(props.student_id){
            getStudent()
        }
    },[])

    const getStudent = async () => {
        setState({
            ...state,
            is_form_submitting: true
        })

        const student = await api.get('/student/get/'+props.student_id, {})

        student.data.student_birthday = fixdate(student.data.student_birthday)
        student.data.student_middle_school_graduation_date = fixdate(student.data.student_middle_school_graduation_date)
        student.data.student_high_school_graduation_date = fixdate(student.data.student_high_school_graduation_date)

        setState(student.data)
        
    }

    const resetState = () => {
        setState({
            student_name:'',
            student_surname:'',
            student_father_name:'',
            student_photo:'',
            student_gender:'',
            student_birthday:'',
            student_nationality:'',
            student_school_number:'',
            student_book_number:'',
            student_middle_school_graduation_date:'',
            student_middle_school_graduation_result:'',
            student_high_school_graduation_date:'',
            student_high_school_graduation_result:'',
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
        console.log(state);
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setState({
            ...state,
            is_form_submitting: true
        })

        let formData = new FormData()

    
        await formData.append('file', state.student_photo)
        await formData.append('data', JSON.stringify(state))


        let submitResponse
        if(props.student_id){
            submitResponse = await api.put('/student/update/'+props.student_id, formData, { headers: {'content-type':'multipart/form-data'}})
            
            setState({
                ...state,
                is_form_submitting: false
            })
        }else{
            submitResponse = await api.post('/student/new', formData, { headers: {'content-type':'multipart/form-data'}})
            resetState()
        }

        if(submitResponse.data.response){
            Swal.fire({
                title: 'Başarılı',
                text: 'Öğrenci kaydedildi',
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


    // render profile photo
    let studentPhotoHtml = ''
    console.log(state);
    if(state.student_photo){
        studentPhotoHtml = <img className="img-thumbnail" src={process.env.REACT_APP_API_ENDPOINT+"/file/"+state.student_photo} />
    }



    return (
        <div class="card">
            {cardLoaderHtml}
            <div class="card-header">
                <span class="h4">Öğrenci Formu</span>
                <p class="text-muted">Yeni öğrenci ekleyebilir veya mevcut öğrencilerinizi düzenleyebilirsiniz.</p>
            </div>
            <div class="card-body">
                <form id="form1" class="form-validate" novalidate="novalidate" onSubmit={handleSubmit}>
                    <div class="h5 mb-4">Kişisel Bilgileri</div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            {studentPhotoHtml}
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_name">Adı (*)</label>
                            <input type="text" class="form-control" value={state.student_name} onChange={handleChange} name="student_name" id="student_name" placeholder="Öğrenci adını giriniz" required="" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="student_surname">Soyadı (*)</label>
                            <input type="text" class="form-control" value={state.student_surname} onChange={handleChange} name="student_surname" id="student_surname" placeholder="Öğrenci soyadını giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_father_name">Baba Adı (*)</label>
                            <input type="text" class="form-control" value={state.student_father_name} onChange={handleChange} name="student_father_name" id="student_father_name" placeholder="Öğrenci baba adını giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_photo">Fotoğrafı (*)</label>
                            <input type="file" class="form-control" onChange={handleChange} name="student_photo" id="student_photo" placeholder="Öğrenci fotoğrafını giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_gender">Cinsiyeti (*)</label>
                            <select className="form-control" value={state.student_gender} onChange={handleChange} name="student_gender" id="student_gender" required >
                                <option value="" disabled selected>Cinsiyet Seçiniz</option>
                                <option value="male">Erkek</option>
                                <option value="female">Kadın</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_birthday">Doğum Tarihi (*)</label>
                            <input type="date" class="form-control" value={state.student_birthday} onChange={handleChange} name="student_birthday" id="student_birthday" placeholder="Öğrenci doğum tarihini giriniz"  required="" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="student_nationality">Uyruğu (*)</label>
                            <select className="form-control" value={state.student_nationality} onChange={handleChange} name="student_nationality" id="student_nationality"  required>
                                <option value="" disabled selected>Uyruk Seçiniz</option>
                                <option value="turkish">Türk</option>
                            </select>
                        </div>
                    </div>
                    <div class="h5 mb-4">Okul Bilgileri</div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_school_number">Okul Numarası (*)</label>
                            <input type="text" class="form-control" value={state.student_school_number} onChange={handleChange} name="student_school_number" id="student_school_number" placeholder="Öğrenci okul numarasını giriniz"  required="" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="student_book_number">Sicil Numarası (*)</label>
                            <input type="text" class="form-control" value={state.student_book_number} onChange={handleChange} name="student_book_number" id="student_book_number" placeholder="Öğrenci sicil numarasını giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_middle_school_graduation_date">Ortaokul Mezuniyet Tarihi (*)</label>
                            <input type="date" class="form-control" value={state.student_middle_school_graduation_date} onChange={handleChange} name="student_middle_school_graduation_date" id="student_middle_school_graduation_date" placeholder="Öğrenci ortaokul mezuniyet tarihini giriniz"  required="" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="student_middle_school_graduation_result">Ortaokul Mezuniyet Sonucu (*)</label>
                            <input type="text" class="form-control" value={state.student_middle_school_graduation_result} onChange={handleChange} name="student_middle_school_graduation_result" id="student_middle_school_graduation_result" placeholder="Öğrenci ortaokul mezuniyet sonucunu giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="student_high_school_graduation_date">Lise Mezuniyet Tarihi (*)</label>
                            <input type="date" class="form-control" value={state.student_high_school_graduation_date} onChange={handleChange} name="student_high_school_graduation_date" id="student_high_school_graduation_date" placeholder="Öğrenci lise mezuniyet tarihini giriniz"  required="" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="student_high_school_graduation_result">Lise Mezuniyet Sonucu (*)</label>
                            <input type="text" class="form-control" value={state.student_high_school_graduation_result} onChange={handleChange} name="student_high_school_graduation_result" id="student_high_school_graduation_result" placeholder="Öğrenci lise mezuniyet sonucunu giriniz" required="" />
                        </div>
                    </div>
                    <button type="submit" class="btn m-t-30 mt-3">Kaydet</button>
                    <a href="/admin/student/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                </form>
            </div>
        </div>
    )

}

export default FormStudent