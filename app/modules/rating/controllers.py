from flask import request, jsonify
from flask_restful import Resource

from app import db
from app.modules.bgrequests import Series, Character, Request, Category, CategoryRequestMap
from app.modules.util import sorted_request_helper

class SeriesResource(Resource):

	def get(self, series_id=None):
		if series_id:
			response = Series.query.get(series_id).serialize
		else:
			response = [x.serialize for x in Series.query.all()]

		return jsonify(response)

	def post(self):
		
		duplicate = Series.query.filter_by(name=request.json["name"]).first()
		if duplicate:
			return duplicate.serialize, 409
		
		s = Series(**request.json)
		
		db.session.add(s)
		db.session.commit()
		
		return s.serialize, 201

class CharacterResource(Resource):

	def get(self, char_id=None):
		if char_id:
			response = Character.query.get(char_id).serialize
		else:
			response = [x.serialize for x in Character.query.all()]

		return jsonify(response)

	def post(self):
		c = Character(**request.json)
		
		db.session.add(c)
		db.session.commit()

		return c.serialize, 201

class RequestResource(Resource):

	def get(self):
		user = request.args.get("user")
		character = request.args.get("character")
		category = request.args.get("category")

		dataset = Request.query.all()
	
		if user: 
			dataset = [x for x in dataset if x.user_id == int(user)]
		if character: 
			dataset = [x for x in dataset if x.character_id == int(character)]
		if category:
			dataset = [x for x in dataset if int(category) in [i.category.id for i in x.categories if i.selected == True]]
		
 		response = [x.serialize for x in dataset]
		
		return jsonify(response)

	def post(self):
		
		dto = {}
		for k in ["user_id", "character_id", "description"]:
			if k in request.json:
				dto[k] = request.json[k]
		
		r = Request(**dto)
		
		db.session.add(r)
		db.session.flush()
		
		for c in Category.query.all():
			m = CategoryRequestMap(category_id=c.id, request_id=r.id, selected=c.id in request.json["categories"])
			db.session.add(m)
			
		db.session.commit()

		return r.serialize, 201
	
class CategoryResource(Resource):

	def get(self, cat_id=None):
		if cat_id:
			response = Category.query.get(cat_id).serialize
		else:
			response = [x.serialize for x in Category.query.all()]

		return jsonify(response)

	def post(self):
		c = Category(**request.json)
		
		db.session.add(c)
		db.session.commit()
		
		return c.serialize, 201
	

		