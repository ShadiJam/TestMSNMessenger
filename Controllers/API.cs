using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;

[Route("/api/userview")]
public class HandleController : CRUDController<UserView> {
    public HandleController(IRepository<UserView> r) : base(r){}

    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(userview => 
            userview.Handle.ToLower().IndexOf(term.ToLower()) != -1
            || userview.Handle.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}

[Route("/api/chatroom")]
public class ChatroomController : CRUDController<Chatroom> {
    public ChatroomController(IRepository<Chatroom> r) : base(r){}

    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(chatroom => 
            chatroom.Title.ToLower().IndexOf(term.ToLower()) != -1
            || chatroom.Title.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}

[Route("/api/message")]
public class MessageController : CRUDController<Message> {
    public MessageController(IRepository<Message> r) : base(r){}

    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(message => 
            message.Text.ToLower().IndexOf(term.ToLower()) != -1
            || message.Text.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}
