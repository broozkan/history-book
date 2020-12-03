import React, {useState} from 'react'
import CardLoader from '../Loader/CardLoader'


const FormStaff = () => {

    const [state, setState] = useState({
        staff_name:'',
        staff_surname:'',
        staff_birthday:'',
        staff_nationality:'',
        staff_country:'',
        staff_gender:'',
        staff_duty:'',
        staff_branch:'',
        staff_duty_beginning_date:'',
        staff_duty_ending_date:''
    })


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


    const handleSubmit = (e) => {
        e.preventDefault()

        // send form data

    }

    return (
        <div className="card">
            <div className="card-header">
                <span className="h4">Personel Formu</span>
                <p className="text-muted">Yeni personel ekleyebilir veya mevcut personellerinizi düzenleyebilirsiniz.</p>
            </div>
            <div className="card-body">
                <form id="form1" className="form-validate" novalidate="novalidate" onSubmit={handleSubmit}>
                    <div className="h5 mb-4">Kişisel Bilgileri</div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="staff_name">Adı (*)</label>
                            <input type="text" className="form-control" onChange={handleChange} value={state.staff_name} name="staff_name" id="staff_name" placeholder="Personel adını giriniz" required="" />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="staff_surname">Soyadı (*)</label>
                            <input type="text" className="form-control" onChange={handleChange} value={state.staff_surname} name="staff_surname" id="staff_surname" placeholder="Personel soyadını giriniz" required="" />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label for="staff_birthday">Doğum Tarihi (*)</label>
                            <input type="date" className="form-control" onChange={handleChange} value={state.staff_birthday} name="staff_birthday" id="staff_birthday" placeholder="Personel doğum tarihini giriniz" required="" />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="staff_nationality">Uyruğu (*)</label>
                            <select className="form-control" onChange={handleChange} value={state.staff_nationality} name="staff_nationality" id="staff_nationality">
                                <option value="" disabled selected>Uyruk Seçiniz</option>
                                <option value="turkish">Türk</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label for="staff_country">Doğum Yeri (*)</label>
                            <select className="form-control" onChange={handleChange} value={state.staff_country} name="staff_country" id="staff_country">
                                <option value="" disabled selected>Şehir Seçiniz</option>
                                <option value="Adıyaman">Adıyaman</option>
                                <option value="Ankara">Ankara</option>
                                <option value="Sivas">Sivas</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="staff_gender">Cinsiyeti (*)</label>
                            <select className="form-control" onChange={handleChange} value={state.staff_gender} name="staff_gender" id="staff_gender" required>
                                <option value="" disabled selected>Cinsiyet Seçiniz</option>
                                <option value="male">Erkek</option>
                                <option value="female">Kadın</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="h5 mb-4">Çalışma Bilgileri</div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="staff_duty">Görevi (*)</label>
                            <select className="form-control" onChange={handleChange} value={state.staff_duty} name="staff_duty" id="staff_duty" required>
                                <option value="" disabled selected>-Görev Seçiniz-</option>
                                <option value="principal">Okul Müdürü</option>
                                <option value="vice_principal">Okul Müdür Yardımcısı</option>
                                <option value="servant">Hademe</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="staff_branch">Branşı (*)</label>
                            <select className="form-control" onChange={handleChange} value={state.staff_branch} name="staff_branch" id="staff_branch" required>
                                <option value="" disabled selected>-Branş Seçiniz-</option>
                                <option value="Matematik">Matematik</option>
                                <option value="Türkçe">Türkçe</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="staff_duty_beginning_date">Görev Başlangıç Tarihi (*)</label>
                            <input type="date" className="form-control" onChange={handleChange} value={state.staff_duty_beginning_date} name="staff_duty_beginning_date" id="staff_duty_beginning_date" placeholder="Personel görev başlangıç tarihi" required="" />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="staff_duty_ending_date">Görev Bitiş Tarihi (*)</label>
                            <input type="date" className="form-control" onChange={handleChange} value={state.staff_duty_ending_date} name="staff_duty_ending_date" id="staff_duty_ending_date" placeholder="Personel görev bitiş tarihi" required="" />
                        </div>
                    </div>
                    <button type="submit" className="btn m-t-30 mt-3">Kaydet</button>
                    <a href="/admin/staff/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                </form>
            </div>
        </div>
    )

}

export default FormStaff