const Branch = require('../models/branch');

exports.create = (request, h) => {

    const BranchData = {
      branchName: request.payload.branchName,
      addressLine1: request.payload.addressLine1,
      addressLine2: request.payload.addressLine2,
      city: request.payload.city,
      state: request.payload.state,
      pincode: request.payload.pincode,
      phone: request.payload.phone,
      headquarter: request.payload.headquarter,
      branch: request.payload.branch,
      contactPerson: request.payload.contactPerson
    };
  
    return Branch.create(BranchData).then((branch) => {
        return { 
           message: "Branch created successfully", branch: branch 
        };
    }).catch((err) => {
        return { err: err };
    });
}


exports.getAll = (request, h) => {
    return Branch.find({}).exec().then((branch) => {

      if(!branch) return { message: "No branch's avaiable" };
  
      return { branchs: branch };
  
    }).catch((err) => {
  
      return { err: err };
  
    });
}


exports.get = (request, h) => {

    return Branch.findById(request.params.id).exec().then((branch) => {
  
      if(!branch) return { message: 'Branch not Found' };
  
      return { branch: branch };
  
    }).catch((err) => {
  
      return { err: err };
  
    });
}



exports.update = (request, h) => {

  return Branch.findById(request.params.id).exec().then((branch) => {

    if (!branch) return { err: 'Branch not found' };

    branch.branchName = request.payload.branchName;
    branch.addressLine1 = request.payload.addressLine1;
    branch.addressLine2 = request.payload.addressLine2;
    branch.city = request.payload.city;
    branch.state = request.payload.state;
    branch.pincode = request.payload.pincode;
    branch.phone = request.payload.phone;
    branch.headquarter = request.payload.headquarter;
    branch.branch = request.payload.branch;
    branch.contactPerson = request.payload.contactPerson;

    branch.save(branch);

  }).then((data) => {

      return { message: "Branch data updated successfully" };

  }).catch((err) => {

      return { err: err };

  });
}




exports.remove = (request, h) => {

    return Branch.findById(request.params.id).exec(function (err, branch) {
      
      if (!branch) return { message: 'Branch not found' };
  
      branch.delete(function (err) {
        if (err) return { dberror: err };
        return { 
          success: true 
        };
      });
      
    });
  }

