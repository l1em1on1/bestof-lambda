resource "aws_dynamodb_table" "bestof_dynamodb_profiles" {
    name = "BestOf_Profiles"
    read_capacity = 1
    write_capacity = 1
    hash_key = "username"
    attribute {
      name = "username"
      type = "S"
    }
}

resource "aws_dynamodb_table" "bestof_dynamodb_topics" {
    name = "BestOf_Topics"
    read_capacity = 1
    write_capacity = 1
    hash_key = "topicId"
    range_key = "topicName"
    attribute {
      name = "topicId"
      type = "S"
    }
    attribute {
      name = "topicName"
      type = "S"
    }
}

resource "aws_dynamodb_table" "bestof_dynamodb_profiles_in_topics" {
    name = "BestOf_ProfiesInTopics"
    read_capacity = 1
    write_capacity = 1
    hash_key = "username"
    range_key = "topicId"
    attribute {
      name = "username"
      type = "S"
    }
    attribute {
      name = "topicId"
      type = "S"
    }
    attribute
    {
      name = "userStatus"
      type = "S"
    }
    global_secondary_index {
      name = "topicIdIndex"
      hash_key = "topicId"
      range_key = "userStatus"
      write_capacity = 1
      read_capacity = 1
      projection_type = "INCLUDE"
      non_key_attributes = [ "username" ]
    }
}
