import React from 'react'
import CardLoader from '../Loader/CardLoader'
import Pagination from '../Pagination/Pagination'


const TableStaff = () => {
    return (
        <div className="card">
            <div className="card-header">

                <span class="h4">
                    Personel Listesi
                    <a href="/admin/staff/new" className="btn btn-primary btn-sm float-right">
                        <span className="fa fa-plus"></span> YENİ PERSONEL EKLE</a>
                </span>
                <p class="text-muted">Sistemdeki tüm personellerin listesidir. Silme, düzenleme işlemleri yapabilirsiniz</p>
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
                                    <label for="staff_name">Adı</label>
                                    <input className="form-control" name="staff_name" id="staff_name" placeholder="Öğrenci adı giriniz" />
                                </div>
                                <div className="form-group ml-3">
                                    <label for="staff_name">Görevi</label>
                                    <select className="form-control" name="staff_duty" id="staff_duty">
                                        <option value="">Farketmez</option>
                                        <option value="principal">Müdür</option>
                                        <option value="vice_principal">Müdür Yardımcısı</option>
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
                                <th scope="col">Görevi</th>
                                <th scope="col">Branşı</th>
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
                                <td>Müdür</td>
                                <td>Fen Bilgisi</td>
                            </tr>
                            <tr>
                                <th>
                                    <div class="form-check">
                                        <input class="form-check-input" id="gridCheck" type="checkbox" />
                                    </div>
                                </th>
                                <td>Ahmet Serdar Turgut</td>
                                <td>Öğretmen</td>
                                <td>Matematik</td>
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

export default TableStaff