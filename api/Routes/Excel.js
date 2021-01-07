const express = require('express')
const router = express()
const multiparty = require('connect-multiparty')
const uploadDir = './public/excel'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const ExcelJS = require('exceljs');const path = require('path')
const fs = require('fs')
const StudentRouter = require('./Student')
const StaffRouter = require('./Staff')



router.post('/import/staff', MultipartyMiddleware, async (req, res) => {

    req.body = JSON.parse(req.body.data)
   

    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)
        let rows = new Array()
        await rename(tmp_path, target_path, async (renameResponse)=>{
            if (renameResponse) {
                var workbook = new ExcelJS.Workbook(); 
                workbook.xlsx.readFile(path.join(uploadDir, req.files.file.name))
                    .then(async function() {
                        var worksheet = workbook.getWorksheet('Sayfa1');
                        await worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                            rows.push(row.values)
                        });

                        rows.map( async (item, index) => {
                          

                            if(index == 0){
                                return
                            }
    
                            if (item[req.body.staff_duty_year_column] != null) {
                                item["staff_duty_beginning_year"] = item[req.body.staff_duty_year_column].split('-')[0]
                                item["staff_duty_ending_year"] = item[req.body.staff_duty_year_column].split('-')[1]
                            }else{
                                
                            }
    
                       
                            if (item[req.body.staff_name_surname_column] != null) {

                                const nameSurname = item[req.body.staff_name_surname_column].trim()
                                const splittedNameSurname = nameSurname.split(' ')
                                if (splittedNameSurname.length > 2) {
                                    item["staff_name"] = ''
                                    splittedNameSurname.forEach((element, nameIndex) => {
                                        if (nameIndex != splittedNameSurname.length - 1) {
                                            item["staff_name"] += element+" "                                            
                                        }
                                    });
                                    item["staff_surname"] = splittedNameSurname[splittedNameSurname.length - 1]

                                }else{
                                    item["staff_name"] = splittedNameSurname[0]
                                    item["staff_surname"] = splittedNameSurname[1]
                                }
                            }
                         
                            

                            let staffData = {
                                staff_name: item["staff_name"],
                                staff_surname: item["staff_surname"],
                                staff_birthday: item[req.body.staff_birthday_column],
                                staff_country: item[req.body.staff_country_column],
                                staff_father_name: item[req.body.staff_father_name_column],
                                staff_gender: item[req.body.staff_gender_column],
                                staff_duty: item[req.body.staff_duty_column],
                                staff_branch: item[req.body.staff_branch_column],
                                staff_duty_beginning_date: item["staff_duty_beginning_year"],
                                staff_duty_ending_date: item["staff_duty_ending_year"]

                            }

                     

                            await StaffRouter.newStaff(staffData, async (result) => {
                                if (result.status) {
                                    console.log("Başarılı");
                                    /*res.send({
                                        response: true,
                                        responseData: result.data
                                    })*/
                                }else{
                                    console.log("Başarızızzzzz");

                                    /*res.send({
                                        response: false,
                                        responseData: result.err.message
                                    })*/
                                }
                            })
                        })
                    
                      
                       
                    });


            }
        })

   
    } else {
        res.send({
            response: false,
            responseData: "Excel dosyası bulunamadı"
        })
        res.end()
    }


})



router.post('/import/student', MultipartyMiddleware, async (req, res) => {

    req.body = JSON.parse(req.body.data)
   

    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)
        let rows = new Array()
        await rename(tmp_path, target_path, async (renameResponse)=>{
            if (renameResponse) {
                var workbook = new ExcelJS.Workbook(); 
                workbook.xlsx.readFile(path.join(uploadDir, req.files.file.name))
                    .then(async function() {
                        var worksheet = workbook.getWorksheet('Sayfa1');
                        await worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                            rows.push(row.values)
                        });

                        rows.map( async (item, index) => {


                            if(index == 0){
                                return
                            }
    
                            if (item[req.body.student_education_year_column] != null) {
                                item["student_education_beginning_year"] = item[req.body.student_education_year_column].split('-')[0]
                                item["student_education_ending_year"] = item[req.body.student_education_year_column].split('-')[1]
                            }
    
                            if (item[req.body.student_name_surname_column] != null) {
                                const splittedNameSurname = item[req.body.student_name_surname_column].split(' ')
                                if (splittedNameSurname.length > 2) {
                                    item["student_name"] = ''
                                    splittedNameSurname.forEach((element, nameIndex) => {
                                        if (nameIndex != splittedNameSurname.length - 1) {
                                            item["student_name"] += element+" "                                            
                                        }
                                    });
                                    item["student_surname"] = splittedNameSurname[splittedNameSurname.length - 1]

                                }else{
                                    item["student_name"] = splittedNameSurname[0]
                                    item["student_surname"] = splittedNameSurname[1]
                                }
                            }

                         
                            let studentData = {
                                student_school_number: item[req.body.student_school_number_column],
                                student_gender: item[req.body.student_gender_column],
                                student_nationality: item[req.body.student_nationality_column],
                                student_name: item["student_name"],
                                student_surname: item["student_surname"],
                                student_birthday: item[req.body.student_birthday_column],
                                student_country: item[req.body.student_country_column],
                                student_father_name: item[req.body.student_father_name_column],
                                student_education_beginning_year: item["student_education_beginning_year"],
                                student_education_ending_year: item["student_education_ending_year"],
                                student_middle_school_graduation_result: item[req.body.student_middle_school_graduation_result_column],
                                student_high_school_graduation_result: item[req.body.student_high_school_graduation_result_column],
                                student_high_school_graduation_exam: item[req.body.student_high_school_graduation_exam_column],
                                student_description: item[req.body.student_description_column]
                            }
                         //   console.log(studentData);

                            await StudentRouter.newStudent(studentData, async (result) => {
                                if (result.status) {
                                    console.log("Başarılı");
                                    /*res.send({
                                        response: true,
                                        responseData: result.data
                                    })*/
                                }else{
                                    console.log("Başarızızzzzz");

                                    /*res.send({
                                        response: false,
                                        responseData: result.err.message
                                    })*/
                                }
                            })
                        })
                    
                      
                       
                    });


            }
        })

   
    } else {
        res.send({
            response: false,
            responseData: "Excel dosyası bulunamadı"
        })
        res.end()
    }


})


const rename = (tmp_path, target_path, callBack) => {
    const response = fs.rename(tmp_path, target_path, (err) => {
        if (err) {
            callBack(false)
        } else {
            fs.unlink(tmp_path, (err) => {

            })
            callBack(true)
        }
    })
}


module.exports = router