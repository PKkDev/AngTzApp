namespace AngTzService.Domain.Model
{
    public class LoadFileInfo
    {
        public long Size { get; set; }

        public string Name { get; set; }

        public byte[] FileByte { get; set; }
    }
}
