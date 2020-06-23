/* WHAT WE WOULD LIKE TO ACHIEVE 
1. get all students' data on url: localhost:3001/students/ GET
2. get single student's data on url: localhost:3001/students/:id GET
3. create single student record on url: localhost:3001/students/ POST
4. modify single student's data on url: localhost:3001/students/:id PUT
5. delete single student's data on url: localhost:3001/students/:id DELETE
*/

const express = require("express") // third party module
const fs = require("fs") // core module dedicated to file system interactions
const path = require("path") // core module
const uniqid = require("uniqid") // third party module

const router = express.Router()

const studentsFilePath = path.join(__dirname, "students.json")

// 1.
router.get("/", (request, response) => {
  // (request, response)=> is the handler for this specific route

  // a) retrieve students list from a file on disk (we do not have a real database yet!)

  // we composed the path on disk (avoid __dirname + "\\students.json")
  const fileContentAsABuffer = fs.readFileSync(studentsFilePath) // please read the file (we are getting a Buffer back)
  console.log(fileContentAsABuffer)
  const fileContent = fileContentAsABuffer.toString() // we need to translate the buffer into something human readable

  // b) send the list as a json in the response body
  response.json(JSON.parse(fileContent)) // JSON.parse converts strings into json format
})

// 2.
router.get("/:id", (request, response) => {
  // retrieve single student from a file on disk (we do not have a real database yet!) and send it back

  // a. read the file on disk and get back an array of students
  const fileContentAsABuffer = fs.readFileSync(studentsFilePath)
  const studentsArray = JSON.parse(fileContentAsABuffer.toString())
  console.log(studentsArray)

  // b. filter out the array to retrieve the specified student (we're gonna be using id to retrive the unique user)
  console.log("ID: ", request.params.id)
  const student = studentsArray.filter((student) => student.id === request.params.id)
  console.log(student)
  // c. send the student back into the response
  response.send(student)
})

// 3.
router.post("/", (request, response) => {
  console.log(request.body)
  const newStudent = { ...request.body, id: uniqid() }

  // 1. read the content of the file and get back an array of students

  const fileContentAsABuffer = fs.readFileSync(studentsFilePath)
  const studentsArray = JSON.parse(fileContentAsABuffer.toString())
  //console.log(studentsArray)

  // const filteredStudentsArray = studentsArray.filter(
  //   (student) => student.email === request.params.email
  // )

  // if (filteredStudentsArray){
  //   response.send("Email already exist!!!")
  // }

  if(studentsFilePath.hasOwnProperty('email')){
    alert('Email already exist!')
 
  }

  else{
    
  // 2. adding the new student to the array
  studentsArray.push(newStudent)

  // 3. writing the new content into the same file

  fs.writeFileSync(studentsFilePath, JSON.stringify(studentsArray))

  // 4. responde with status 201 === "Created"

  response.status(201).json(newStudent)
  }
})

// 4.
router.put("/:id", (request, response) => {
  // 1. read the content of the file and get back an array of students

  const fileContentAsABuffer = fs.readFileSync(studentsFilePath)
  const studentsArray = JSON.parse(fileContentAsABuffer.toString())

  // 2. filter students by excluding the one with specified id
  const filteredStudentsArray = studentsArray.filter(
    (student) => student.id !== request.params.id
  )

  // 3. adding back the student with the modified body
  const student = request.body // request.body is holding the new data for the specified student
  student.id = request.params.id

  filteredStudentsArray.push(student)

  // 4. write it back into the same file

  fs.writeFileSync(studentsFilePath, JSON.stringify(filteredStudentsArray))

  // 5. respond back with ok
  response.send("Ok")
})

// 5.
router.delete("/:id", (request, response) => {
  // 1. read the content of the file and get back an array of students

  const fileContentAsABuffer = fs.readFileSync(studentsFilePath)
  const studentsArray = JSON.parse(fileContentAsABuffer.toString())

  // 2. filter students by excluding the one with specified id
  const filteredStudentsArray = studentsArray.filter(
    (student) => student.id !== request.params.id
  )

  // 3. write the filterd content back into the same file

  fs.writeFileSync(studentsFilePath, JSON.stringify(filteredStudentsArray))
  // 4. respond with ok

  response.send("Ok")
})

module.exports = router
