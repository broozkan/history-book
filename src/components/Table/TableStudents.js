import React from 'react'
import CardLoader from '../Loader/CardLoader'
import Pagination from '../Pagination/Pagination'


const TableStudents = () => {
    return (
        <div className="card">
            <div className="card-header">

                <span class="h4">
                    Öğrenci Listesi
                    <a href="/admin/student/new" className="btn btn-primary btn-sm float-right">
                        <span className="fa fa-plus"></span> YENİ ÖĞRENCİ EKLE</a>
                </span>
                <p class="text-muted">Sistemdeki tüm öğrencilerin listesidir. Silme, düzenleme işlemleri yapabilirsiniz</p>
            </div>
            <div className="card-body">
            <div className="row table-query-row">
                    <div className="col-lg-12">
                        <div className="query-buttons">
                            <a href="#" className="text-default"><span className="fa fa-filter"></span> Filtrele</a>
                            <a href="#" className="text-danger  mx-2"><span className="fa fa-trash"></span> Sil</a>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="query-form-field">
                            <form className="form-inline">
                            <div className="form-group">
                                    <label for="student_name">Adı</label>
                                    <input className="form-control" name="student_name" id="student_name" placeholder="Personel adı giriniz" />
                                </div>
                                <div className="form-group ml-3">
                                    <label for="student_gender">Cinsiyeti</label>
                                    <select className="form-control" name="student_gender" id="student_gender">
                                        <option value="">Farketmez</option>
                                        <option value="male">Erkek</option>
                                        <option value="female">Kadın</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Adı Soyadı</th>
                                <th scope="col">Okul Numarası</th>
                                <th scope="col">Sicil Numarası</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>
                                    <div class="form-check">
                                        <input class="form-check-input" id="gridCheck" type="checkbox" />
                                    </div>
                                </th>
                                <td>Burhan Özkan</td>
                                <td>2786418742</td>
                                <td>8AB48F42</td>
                            </tr>
                            <tr>
                                <th>
                                    <div class="form-check">
                                        <input class="form-check-input" id="gridCheck" type="checkbox" />
                                    </div>
                                </th>
                                <td>Burhan Özkan</td>
                                <td>2786418742</td>
                                <td>8AB48F42</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
            <div className="card-footer">
                <Pagination />

            </div>

        </div>

    )
}

export default TableStudents