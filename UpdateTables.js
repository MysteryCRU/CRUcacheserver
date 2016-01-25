
//
// Add ministries field to campus collection
//
i = db.ministries.find({}, {"_id": 1, "campuses": 1});
while ( i.hasNext() ) {
	ministry = i.next();

	ministryId = ministry["_id"];
	ministryCampuses = ministry["campuses"];

	//print("=== Evaluating ministry " + ministryId + " =========== ");

	if (ministryCampuses == 0) {
		print("Ministry " + ministryId +  " has no campuses.");
	}

	for (index = 0; index < ministryCampuses.length; ++index) {
		print("Adding ministry " + ministryId + " to campus " + ministryCampuses[index]);

		db.campus.update(
			{ _id: ministryCampuses[index]},
			{ $push: { ministries: ministryId } }
		);
	}
}
