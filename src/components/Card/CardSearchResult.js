import React from 'react'

const CardSearchResult = () => {

    return (
        <div class="col-lg-6">
            <div class="team-member">
                <div class="team-image">
                    <img src="https://1.bp.blogspot.com/_PuVIh5XWcv4/TT33Cx_jSYI/AAAAAAAAAFs/68XmCfBglgU/s1600/foto+ekram-4.JPG" />
                </div>
                <div class="team-desc">
                    <span>Mahir Hamza Tirkeş Oğlu</span>

                    <h3>BASRİ BAHADIR TİRKEŞ</h3>
                    <ul className="team-member-ul list-style-none">
                        <li><span className="fa fa-birthday-cake"></span> 1897</li>
                        <li><span className="fa fa-map-marker-alt"></span> Sivas</li>
                        <li><span className="fa fa-globe-americas"></span> Türk</li>
                    </ul>
                    <div class="align-center">
                        <a class="btn btn-xs btn-slide btn-light" href="#">
                            <i class="fas fa-chevron-right"></i>
                            <span>PROFİLE GİT</span></a>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default CardSearchResult