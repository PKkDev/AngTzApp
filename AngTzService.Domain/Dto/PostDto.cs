﻿using System;
using System.Collections.Generic;

namespace AngTzService.Domain.Dto
{
    public class PostDto
    {
        public int Id { get; set; }

        public string Author { get; set; }

        public DateTime? Date { get; set; }

        public bool Edited { get; set; }

        public string Text { get; set; }

        public List<FileDescDto> FileDescDto { get; set; }
    }
}
