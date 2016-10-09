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
    hash_key = "topic"
    attribute {
      name = "topic"
      type = "S"
    }
}

resource "aws_dynamodb_table" "bestof_dynamodb_profiles_in_topics" {
    name = "BestOf_ProfiesInTopics"
    read_capacity = 1
    write_capacity = 1
    hash_key = "username"
    range_key = "topic"
    attribute {
      name = "username"
      type = "S"
    }
    attribute {
      name = "topic"
      type = "S"
    }
}

resource "aws_dynamodb_table" "bestof_dynamodb_topics_has_profiles" {
    name = "BestOf_TopicsHasProfiles"
    read_capacity = 1
    write_capacity = 1
    hash_key = "topic"
    range_key = "username"
    attribute {
      name = "topic"
      type = "S"
    }
    attribute {
      name = "username"
      type = "S"
    }
}
