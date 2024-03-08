from transformers import pipeline
from transformers import logging


def text_summarizer(text):
  classifier = pipeline("summarization")
  summary = classifier(text)[0]['summary_text']
  return summary


logging.set_verbosity_warning()
logging.set_verbosity_error()

text = """
University marks rare achievement at annual Golden Circle gala, highlighted by performance from superstar John Legend

SANTA CLARA, Calif., Jan. 27, 2024—Santa Clara University today celebrated a rare and prestigious milestone: the completion of its $1 billion Innovating with a Mission campaign, the largest comprehensive fundraising campaign in the University’s 173-year history.

In under 10 years, the Innovating with a Mission campaign has energized the Jesuit, Catholic university campus with wide-ranging physical and programmatic transformations, diversifying the campus and creating new opportunities and experiences for current and future generations of students, faculty, alumni and staff.  Of the just-over $1 billion raised, hundreds of millions of dollars are supporting student scholarships and financial aid; new STEM, residential and arts facilities and programming; internships and experiential learning opportunities; and expanded athletic and collaboration spaces across campus.

“The success of this Campaign is a testament to the commitment of our alumni and supporters to our mission to produce not just exceptional scholars, but true persons for others, who will make a positive impact on our global society and our nation’s democracy—no matter their fields of endeavor,” said President Julie Sullivan. “The world needs what Santa Clara has to offer.”

The acheivement was celebrated Saturday, Jan. 27, during the University’s annual Golden Circle gala at the San Jose Center for the Performing Arts. Superstar singer John Legend—whose hits include “All of Me,” “Green Light,” and “Ordinary People”— was the event headliner. Following the performance, laser lights and music accompanied the nearly 2,500 guests as they walked from the Center to dinner at The Signia by Hilton San Jose hotel.

More than 46,000 supporters 

Innovating with a Mission launched in July 2014. The record total of $1.017 billion reflects contributions from more than 46,000 alumni, corporations, foundations, parents and other friends of Santa Clara. The showing is a reflection of the broad-based support for the Silicon Valley-based University’s academic excellence and values-based mission.

Santa Clara now becomes the fourth Catholic university in the United States to reach that $1 billion goal. SCU also joins a select group of fewer than 5% of all U.S. universities that have raised $1 billion—only a handful of which, like Santa Clara, have done so without being a designated Research 1 (R1) university, or home to a medical school.

“This Campaign marks a key moment in Santa Clara University’s ascent as one of the nation’s leading institutions of higher learning,” said Larry Sonsini, chair of Santa Clara University’s Board of Trustees. “It helps us fulfill our promise to equip all talented students with the knowledge and ethical clarity our complex and globalizing world will demand of them.”
"""

print(text_summarizer(text))
