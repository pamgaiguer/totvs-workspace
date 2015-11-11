function getPass(userId){
	log.info("================= GET PASS ====================");
  	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", userId, userId, 	ConstraintType.MUST);
  	var constraints   = new Array(c1);
	var fields = new Array("passwd", "login", "colleaguePK.colleagueId","colleaguePK.companyId");
  	var dataset = DatasetFactory.getDataset("colleague", fields, constraints, null);
  	return "MD5:" + dataset.getValue(0,"passwd");
}