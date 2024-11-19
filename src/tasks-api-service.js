import ApiService from './framework/view/api-service.js';


const Method = {
 GET: 'GET',
 PUT: 'PUT',
 POST: 'POST',
 DELETE: 'DELETE',
};


export default class TasksApiService extends ApiService {
 get tasks() {
   return this._load({url: 'tasks'})
     .then(ApiService.parseResponse);
 }

 async addTask(task) {
  const responce = await this._load({
        url:"tasks",
        method:Method.POST,
        body: JSON.stringify(task),
        headers: new Headers({"Content-Type": "application/json"}),
  });
  return ApiService.parseResponse(responce);
 }


}
