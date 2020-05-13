using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyComics.Models;

namespace MyComics.Controllers
{

    [EnableCors("allowsAll")]
    [Route("[controller]")]
    [ApiController]
    public class ComicsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            DataContext db = new DataContext();
            return Ok(db.Comic.Include(x => x.Category).ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            DataContext db = new DataContext();
            Comic c = db.Comic.Include(x => x.Category).FirstOrDefault(x => x.Id == id);
            return Ok(c);
        }

        [HttpGet("recherche/{search}")]
        public IActionResult GetComicsBySearch(string search)
        {
            DataContext db = new DataContext();
            List<Comic> comicsByTitle = db.Comic.Include(x => x.Category).Where(c => c.Title.Contains(search)).ToList();
            List<Comic> comicsByWriter = db.Comic.Include(x => x.Category).Where(c => c.Writer.Contains(search)).ToList();
            List<Comic> comics = comicsByTitle.Union(comicsByWriter).Distinct().ToList();

            return Ok(comics);
        }

        [HttpGet("category/{categoryId}")]
        public IActionResult GetComicsByCategory(int categoryId)
        {
            DataContext db = new DataContext();
            List<Comic> comics = db.Comic.Include(x => x.Category).Where(c => c.Category.Id == categoryId).ToList();
            return Ok(comics);
        }

        [HttpPost]
        public IActionResult Post([FromForm]FormType data)
        {
            DataContext db = new DataContext();
            string img = data.Image.FileName;
            string pathToUpload = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "images", img);
            FileStream stream = System.IO.File.Create(pathToUpload);
            data.Image.CopyTo(stream);
            stream.Close();
            Comic comic = new Comic();
            comic.Cover = "images/" + img;
            comic.CoverImage = System.IO.File.ReadAllBytes($"./wwwroot/{comic.Cover}");
            db.Comic.Add(comic);
            db.SaveChanges();

            return Ok(new { id = comic.Id });
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id,[FromBody]Comic comic)
        {
            DataContext db = new DataContext();
            Comic bd = db.Comic.FirstOrDefault(c => c.Id == id);
            if (bd == null)
            {
                return NotFound();
            }
            bd.Title = comic.Title;
            bd.Writer = comic.Writer;
            bd.Synopsis = comic.Synopsis;
            bd.Content = comic.Content;
            bd.CategoryId = comic.CategoryId;
            db.SaveChanges();

            return Ok(new { id = bd.Id });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            DataContext db = new DataContext();
            Comic comicToDelete = db.Comic.FirstOrDefault(x => x.Id == id);
            if(comicToDelete != null)
            {
                db.Comic.Remove(comicToDelete);
                db.SaveChanges();
                return Ok(new { message = "deleted" });
            }
            else
            {
                return NotFound();
            }
        }
    }
    public class FormType
    {
        public IFormFile Image { get; set; }

    }
}