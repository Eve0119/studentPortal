export function getAllStudent(req, res){
    req.status(200).json({message: "Fetched all students successfully"})
}

export function createStudent(req, res){
    req.status(201).json({message: "Student created successfully"})
}

export function updateStudent(req, res){
    req.status(200).json({message: "Updated student Successfully"})
}

export function deleteStudent(req, res){
    req.status(200).json({message: "Deleted student Successfully"})
}