import React, { useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Breadcrumb, Button, Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { LabelField, LabelTextarea } from "../../components/fields";
import {
  Box,
  Icon,
  Input,
  Label,
  Image,
  Text,
} from "../../components/elements";
import { createNews } from "../../api/news";
import { toast } from "react-toastify";

const AddNews = () => {
  const [news, setNews] = useState({
    title: "",
    image: null,
    paragraphs: [""],
  });

  const resetNews = () => {
    setNews({
      title: "",
      image: null,
      paragraphs: [""],
    });
  };
  const addParagraph = () => {
    let tempNews = news;
    tempNews.paragraphs.push("");
    setNews({ ...tempNews });
  };

  const removeParagraph = (index) => {
    let tempNews = news;
    tempNews.paragraphs.splice(index, 1);
    setNews({ ...tempNews });
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setNews((prevNews) => {
      if (name === "title") {
        return { ...prevNews, [name]: value };
      } else if (name === "paragraphs") {
        const newParagraphs = [...prevNews.paragraphs];
        newParagraphs[index] = value;
        return { ...prevNews, paragraphs: newParagraphs };
      }
    });
  };

  const handleImageChange = (e) => {
    setNews({ ...news, ["image"]: e.target.files[0] });
  };

  const removeImage = () => {
    setNews({ ...news, ["image"]: null });
  };

  const handleSubmit = async () => {
    if(!news.title || news.title.length===0){
        toast.warning('Title must be present')
        return;
    }
    const NewsData = new FormData();
    NewsData.append("title", news.title);
    if (news.image) NewsData.append("image", news.image);

    news.paragraphs.forEach((para, index) => {
      NewsData.append(`paragraphs[${index}]`, para);
    });

    try {
      const { data } = await createNews(NewsData);
      resetNews();
      toast.success('News added successfully')
    } catch (error) {
      toast.error('Failed to add news')
      console.log(error);
    } finally {
    }
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <LabelField
            type="text"
            label="Title"
            name="title"
            onChange={handleChange}
            value={news.title}
            fieldSize="w-100 h-md"
          />
        </Col>

        <Col xl={5}>
          <CardLayout>
            <Box className="mc-trip-upload-media">
              {/* <input type="file" name='image' multiple onChange={handleImageChange} /> */}
              <Box className="mc-trip-upload-file">
                <Input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                />
                <Label htmlFor="image">
                  <Icon type="collections" />
                  <Text>{news.image ? "change photo" : "upload photo"}</Text>
                </Label>
              </Box>
              {news.image && (
                <Box className="mc-trip-upload-image">
                  <Image
                    src={URL?.createObjectURL?.(news.image)}
                    alt="player photo"
                    style={{ maxHeight: "250px" }}
                  />
                  <Button
                    style={{ color: "red" }}
                    onClick={removeImage}
                    className="material-icons delete position-absolute top-0 end-0 m-2 image-delete-button"
                  >
                    cancel
                  </Button>
                </Box>
              )}
            </Box>
          </CardLayout>
        </Col>

        <Row>
          <CardLayout className={""}>
            {news.paragraphs.map((para, index) => (
              <Row key={index}>
                <Col xl={10}>
                  <LabelTextarea
                    type="text"
                    label={`Paragraph number ${index + 1}`}
                    name={`paragraphs`}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                    value={news.paragraphs[index]}
                    fieldSize="w-100 h-text-md"
                  />
                </Col>
                <Col xl={2}>
                  <Button
                    className="mc-btn primary text-xl my-4"
                    onClick={() => {
                      removeParagraph(index);
                    }}
                  >
                    {" "}
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              className="mc-btn primary text-xl my-4"
              onClick={addParagraph}
            >
              Add Paragraph
            </Button>
          </CardLayout>
        </Row>
      </Row>

      <Col xl={12}>
        <Button className="mc-btn primary text-xl my-4" onClick={handleSubmit}>
          Add News
        </Button>
      </Col>
    </PageLayout>
  );
};

export default AddNews;
