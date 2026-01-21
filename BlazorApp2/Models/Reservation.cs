namespace BlazorApp2.Models
{
    public class Reservation
    {
        public int Id { get; set; }

        public string Customer { get; set; }= string.Empty;

        public DateTime Date { get; set; } = DateTime.Now;

        public int PeopleCount { get; set; }
    }
}
