class DataEntry {
  async addDataEntry(req, res, db) {
    try {
      const {title, description, date, location, optional_photos} = req.body
      const isExist = `select * from data where title='${title}'`
      const result = await db.get(isExist)
      console.log('result from add data', result)
      if (result === undefined) {
        const query = `insert into data(title,description,date,location,optional_photos) values('${title}','${description}','${date}','${location}',${optional_photos})`
        const insertResult = await db.run(query)
        const {lastID} = insertResult
        res.status(201).send(`Data added successfully , id=${lastID}`)
      } else {
        res.status(400).send('Data with the given title already exist')
      }
    } catch (e) {
      console.log('Error occured in DataEntry class , addDataEntry method')
    }
  }

  async getDataEntry(req, res, db) {
    try {
      const {id} = req.params
      const query = `select * from data where id=${id}`
      const item = await db.get(query)
      if (item !== undefined) {
        res.send(item)
      } else {
        res.send(`DataENtry with id ${id} is not found, try again`)
      }
    } catch (e) {
      console.log('Error occured in DataEntry class, getDataEntry method')
    }
  }

  async updateDataEntry(req, res, db) {
    try {
      const {id} = req.params
      console.log('id in update', id)
      const {title, description, date, location, optional_photos} = req.body
      console.log('body', req.body)
      const query = `update recipe set title='${title}',description='${description}',
         date='${date}',location='${location}'
         where id=${id}
         `
      await db.run(query)
      res.send('Updated Successfully')
    } catch (e) {
      console.log('Error occured in DataEntry class , updateDataEntry method')
    }
  }

  async DeleteDataEntry(req, res, db) {
    try {
      const {id} = req.params
      const query = `delete from data where id=${id}`

      await db.run(query)
      res.send('Record Deleted')
    } catch (e) {
      console.log('Error occured in DataEntry class, DeleteDataEntry method')
    }
  }
}
module.exports = DataEntry
