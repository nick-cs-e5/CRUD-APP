const Branch = require('../models/branch');

exports.create = (request, h) => {

    // Taking Branch data from body using payload
    const BranchData = {
      branchName: request.payload.branchName,
      addressLine1: request.payload.addressLine1,
      addressLine2: request.payload.addressLine2,
      city: request.payload.city,
      state: request.payload.state,
      pincode: request.payload.pincode,
      phone: request.payload.phone,
      type: request.payload.type,
      contactPerson: request.payload.contactPerson
    };
  
    // Pushing the Branch data to database
    return Branch.create(BranchData).then((branch) => {
        return { 
           message: "Branch created successfully", branch: branch 
        };
    }).catch((err) => {
        return { err: err };
    });
}


exports.getAll = (request, h) => {
    
   // Getting all the branchs informations from database using find method
    return Branch.find({}).exec().then((branch) => {

      if(!branch) return { message: "No branch's avaiable" };
  
      return { branchs: branch };
  
    }).catch((err) => {
  
      return { err: err };
  
    });
}


exports.get = (request, h) => {

    // Getting the branch information with unique Id from database using findById method from routes
    return Branch.findById(request.params.id).exec().then((branch) => {
  
      if(!branch) return { message: 'Branch not Found' };
  
      return { branch: branch };
  
    }).catch((err) => {
  
      return { err: err };
  
    });
}



exports.update = (request, h) => {

  // Updating Branch Information using findOneAndUpdate, which takes unique branchId from parameter and update informations in database
  return Branch.findOneAndUpdate({_id:request.params.id},{$set:request.payload},{new:true,useFindAndModify:false}).then((branch) => {
    if(!branch) return { message: 'Unable to update branch' };
    return { 
       message: "Branch update successfully", branch: branch 
    };
  })
  .catch((err) => {
    return { err: err };
  });
}




exports.remove = (request, h) => {

    // Deleting Branch from database using findOneAndDelete, which take the branchId from the parameter
    return Branch.findOneAndDelete({_id:request.params.id})
    .then(branch=>{
      return {msg:"deleted successfully",data:branch}
    })
    .catch(err=>{
      return {err:err}
    })
  }

